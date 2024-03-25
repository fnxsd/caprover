#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from typing import Collection, Optional, Sequence, TypeAlias, AnyStr, Union, Callable
from pathlib import Path

import os
from difflib import SequenceMatcher

StrPath: TypeAlias = str | os.PathLike[str]  # stable
BytesPath: TypeAlias = bytes | os.PathLike[bytes]  # stable
GenericPath: TypeAlias = AnyStr | os.PathLike[AnyStr]
StrOrBytesPath: TypeAlias = str | bytes | os.PathLike[str] | os.PathLike[bytes]


def expand_path(path: StrPath) -> Path:
    return Path(os.path.expandvars(path)).expanduser().resolve()


def compare_folders(
    p1: StrPath,
    p2: Optional[StrPath] = None,
    *,
    ignore: Optional[
        Union[
            StrPath,
            Callable[[StrPath], bool],
            Sequence[Union[StrPath, Callable[[StrPath], bool]]],
        ]
    ] = None,
    only_files=False,
    only_folders=False,
    recursive=False,
    verbose=False,
):
    """
    Compare two folders.
    """
    if p2 is None:
        p2 = p1
        p1 = Path.cwd()
    p1 = expand_path(p1)
    p2 = expand_path(p2)
    if ignore:
        if not isinstance(ignore, Collection):
            ignore = [ignore]
        ignore = [expand_path(p) if isinstance(p, str) else p for p in ignore]
    if not p1.is_dir():
        raise NotADirectoryError(f"{p1} is not a directory.")
    if not p2.is_dir():
        raise NotADirectoryError(f"{p2} is not a directory.")
    if recursive:
        return _compare_folders_recursive(
            p1,
            p2,
            ignore=ignore,
            only_files=only_files,
            only_folders=only_folders,
            verbose=verbose,
        )
    else:
        return _compare_folders(
            p1,
            p2,
            ignore=ignore,
            only_files=only_files,
            only_folders=only_folders,
            verbose=verbose,
        )


def folder_names(in_folder: StrPath):
    """
    Return a list of folder names in the given folder.
    """
    return [f.name for f in Path(in_folder).iterdir() if f.is_dir()]

def file_names(in_folder: StrPath):
    """
    Return a list of file names in the given folder.
    """
    return [f.name for f in Path(in_folder).iterdir() if f.is_file()]

def _compare_folders(
            p1: Path,
    p2: Path,
    *,
    ignore: Optional[
        Union[
            StrPath,
            Callable[[StrPath], bool],
            Sequence[Union[StrPath, Callable[[StrPath], bool]]],
        ]
    ] = None,
    only_files=False,
    only_folders=False,
    verbose=False,
):
    """
    Compare two folders.
    """
    if ignore:
        if not isinstance(ignore, Collection):
            ignore = [ignore]
        ignore = [expand_path(p) if isinstance(p, str) else p for p in ignore]
    if not p1.is_dir():
        raise NotADirectoryError(f"{p1} is not a directory.")
    if not p2.is_dir():
        raise NotADirectoryError(f"{p2} is not a directory.")
    p1_folders = folder_names(p1)
    p2_folders = folder_names(p2)
    p1_files = file_names(p1)
    p2_files = file_names(p2)
    if ignore:
        if not isinstance(ignore, Collection):
            ignore = [ignore]
        ignore = [expand_path(p) if isinstance(p, str) else p for p in ignore]
        p1_folders = [
            f
            for f in p1_folders
            if not any(
                [i(f) if callable(i) else f == i for i in ignore]
            )
        ]
        p2_folders = [
            f
            for f in p2_folders
            if not any(
                [i(f) if callable(i) else f == i for i in ignore]
            )
        ]
        p1_files = [
            f
            for f in p1_files
            if not any(
                [i(f) if callable(i) else f == i for i in ignore]
            )
        ]
        p2_files = [
            f
            for f in p2_files
            if not any(
                [i(f) if callable(i) else f == i for i in ignore]
            )
        ]
    if verbose:
        print(f"Comparing {p1} and {p2}")
        print(f"Subfolders in {p1}: {p1_folders}")
        print(f"Subfolders in {p2}: {p2_folders}")
        print(f"Files in {p1}: {p1_files}")
        print(f"Files in {p2}: