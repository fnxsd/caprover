#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
Functions to facilitate the comparison of folders and files, including their contents.
"""
from typing import Optional,Sequence,TypeAlias,AnyStr
from pathlib import Path
from dataclasses import dataclass
from os import PathLike


StrPath: TypeAlias = str | PathLike[str]  # stable
BytesPath: TypeAlias = bytes | PathLike[bytes]  # stable
GenericPath: TypeAlias = AnyStr | PathLike[AnyStr]
StrOrBytesPath: TypeAlias = str | bytes | PathLike[str] | PathLike[bytes]  

@dataclass
class Folder:
    """
    Dataclass for a folder.
    """

    @property
    def name(self) -> str:
        return self._name
    @property
    def str_path(self) -> str:
        return str(self._path)
    @property
    def path(self) -> Path:
        return self._path
    def __init__(self, path: Optional[StrOrBytesPath]=None,*, name: Optional[str]=None, files: Optional[list]=None, folders: Optional[list]=None):
        """
        __init__ method for Folder class.

        :param path: Path to the folder, defaults to None. If None, the path will be set to the current working directory.
        :param name: Name override, defaults to None
        :param files: File list that will be reported, defaults to None
        :param folders: Folde list that will be reported, defaults to None
        """
        if path:
            if isinstance(path, Path):
                self._path = path
            else:
                self._path = Path(str(path))
        
        self._name = name or self._path.name
        self._files = files or []
        self._folders = folders or []

    def __str__(self):
        return f"{self.name} ({self.path})"

    def __repr__(self):
        return f"{self.name} ({self.path})"

    def __eq__(self, other):
        return self.path == other.path

    def __hash__(self):
        return hash(self.path)

    def __lt__(self, other):
        return self.name < other.name

    def __le__(self, other):
        return self.name <= other.name

    def __gt__(self, other):
        return self.name > other.name

    def __ge__(self, other):
        return self.name >= other.name