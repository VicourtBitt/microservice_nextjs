"use client";

import React, { useState } from "react";
import { 
  List, 
  ListItemButton, 
  ListItemText, 
  Collapse, 
  Divider, 
  IconButton,
  ListItemSecondaryAction,
  Box
} from "@mui/material";
import { useRouter, usePathname } from "next/navigation";
import { Navigation } from "@/data/navigation";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface NavigationItemProps {
  navigationObject: Navigation[];
}

export default function NavigationItem({ navigationObject }: NavigationItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  
  const toggleExpand = (key: string, event: React.MouseEvent) => {
    // Stop propagation to prevent navigation when clicking the expand button
    event.stopPropagation();
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleNavigation = (path: string) => {
    router.push(path);
  };
  
  const NavItem = ({ 
    item, 
    pathKey, 
    depth = 0 
  }: { 
    item: Navigation, 
    pathKey: string, 
    depth?: number 
  }) => {
    if (item.type === 'divider') {
      return <Divider key={pathKey} />;
    }
    
    const isExpanded = !!expandedItems[pathKey];
    const hasChildren = item.children && item.children.length > 0;
    const isActive = pathname === item.path;
    
    if (!hasChildren) {
      // Simple item with no children
      if (!item.path || !item.title) return null;
      return (
        <ListItemButton
          key={pathKey}
          onClick={() => handleNavigation(item.path || "")}
          sx={{ 
            pl: 2 + depth * 2,
            bgcolor: isActive ? 'action.selected' : 'inherit'
          }}
        >
          {item.icon && (
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
          )}
          <ListItemText primary={item.title} />
        </ListItemButton>
      );
    }
    
    // Item with children - make both parent clickable and have expand/collapse button
    return (
      <React.Fragment key={pathKey}>
        <ListItemButton 
          onClick={() => item.path && handleNavigation(item.path)}
          sx={{ 
            pl: 2 + depth * 2,
            pr: 4, // Space for the expand button
            bgcolor: isActive ? 'action.selected' : 'inherit'
          }}
        >
          {item.icon && (
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {item.icon}
            </Box>
          )}
          <ListItemText primary={item.title} />
          <ListItemSecondaryAction>
            <IconButton 
              edge="end" 
              onClick={(e) => toggleExpand(pathKey, e)}
              size="small"
            >
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItemButton>
        
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {item.children?.map((child, index) => (
              <NavItem
                key={`${pathKey}-${index}`}
                item={child}
                pathKey={`${pathKey}-${index}`}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
  };
  
  return (
    <List component="nav" sx={{ width: '100%' }}>
      {navigationObject.map((item, index) => (
        <NavItem 
          key={index}
          item={item}
          pathKey={`nav-${index}`}
        />
      ))}
    </List>
  );
}