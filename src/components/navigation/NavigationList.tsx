"use client"

import React from "react"
import { navigationObject } from "@/data/navigation"
import NavigationItem from "./NavigationItem"

export default function NavigationList() {
    return (
        <NavigationItem
            navigationObject={navigationObject}
        />
    )
}