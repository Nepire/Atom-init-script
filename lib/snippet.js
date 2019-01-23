'use babel'

let c=`
#include <stdio.h>
#indlcue <stdlib.h>

int main()
{
    return 0;
}
`
let cpp=`
#include <iostream>

int main()
{
    std::cout << "Hello world" << std::endl;
    return 0;
}
`
let go =`
package main

import "fmt"

func main(){
    fmt.Println("Hello, World!")
}
`
let python =`
#! /usr/bin/env python
# -*- coding: utf-8 -*-
# Distributed under terms of the MIT license.
# Author = 
`
let bash =`
#!/bin/bash
`

let snippet = {
    "c": c,
    "cpp": cpp
    "go": go
    "py": python
    "sh": bash
}

export default snippet;
