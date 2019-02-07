'use babel'

let c=`#include <stdio.h>
#indlcue <stdlib.h>

int main()
{
    return 0;
}
`
let cpp=`#include <iostream>

int main()
{
    std::cout << "Hello world" << std::endl;
    return 0;
}
`
let go =`package main
import "fmt"

func main(){
    fmt.Println("Hello, World!")
}
`
let python =`#! /usr/bin/env python
# -*- coding: utf-8 -*-
# Distributed under terms of the MIT license.
# Author =
`
let bash =`#!/bin/bash`

let pwn = `#! /usr/bin/env python
# -*- coding: utf-8 -*-
# Distributed under terms of the MIT license.
# Author = nepire

ARCH = ""
BIN = ""
DEBUG = 1
LIBC = ""
IP = ""
port = ""


#########################
from pwn import*
context(os='linux',arch=ARCH,log_level='debug')
if DEBUG:
    n = process(BIN)
    elf = ELF(BIN)
    libc = elf.libc

else:
    n = remote(IP,PORT)
    elf = ELF(BIN)
    #libc = ELF(LIBC)
#########################

def debug():
    gdb.attach(n)

def pwn():




    n.interactive()


if __name__ == '__main__':
    pwn()
`

let snippet = {
    "c": c,
    "cpp": cpp,
    "go": go,
    "py": python,
    "sh": bash,
    "pwn": pwn
}

export default snippet;
