import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Dashboard,
  Settings,
  BarChart,
  Folder,
  People,
  Notifications,
  MoreVert,
  AccountCircle,
  Help,
  Info,
  GetApp,
  SettingsOutlined,
  TuneOutlined,
  OpenInNewOutlined,
  PhoneOutlined,
  ChatOutlined,
  LogoutOutlined,
} from '@mui/icons-material';

const COLORS = {
  primary: '#003d78',
  white: '#ffffff',
  textPrimary: '#212121',
  selectedBg: '#eaf2fd',
  hoverBg: '#003d781a',
  divider: '#E9ECF2',
};

const TYPOGRAPHY = {
  primarySize: 16,
  secondarySize: 14,
  groupHeaderSize: 16,
  fontFamily: 'Roboto, sans-serif',
  fontWeightMedium: 500,
  fontWeightRegular: 400,
};

const navItems = [
  {
    id: 'group1',
    label: 'Lorem Ipsum',
    type: 'group',
  },
  {
    id: 'item1',
    label: 'Lorem Ipsum',
    icon: Dashboard,
    type: 'item',
  },
  {
    id: 'item2',
    label: 'Lorem Ipsum',
    icon: BarChart,
    type: 'item',
  },
  {
    id: 'item3',
    label: 'Lorem Ipsum',
    icon: Settings,
    type: 'item',
  },
  {
    id: 'expandable1',
    label: 'Lorem Ipsum',
    icon: Folder,
    type: 'expandable',
    children: [
      { id: 'sub1', label: 'Lorem Ipsum' },
      { id: 'sub2', label: 'Lorem Ipsum' },
      {
        id: 'sub3',
        label: 'Lorem Ipsum',
        type: 'expandable',
        children: [
          { id: 'nested1', label: 'Lorem Ipsum' },
          { id: 'nested2', label: 'Lorem Ipsum' },
        ],
      },
    ],
  },
  {
    id: 'expandable2',
    label: 'Lorem Ipsum',
    icon: People,
    type: 'expandable',
    children: [
      { id: 'sub4', label: 'Lorem Ipsum' },
      { id: 'sub5', label: 'Lorem Ipsum' },
      { id: 'sub6', label: 'Lorem Ipsum' },
    ],
  },
  {
    id: 'expandable3',
    label: 'Lorem Ipsum',
    icon: Notifications,
    type: 'expandable',
    children: [
      { id: 'sub7', label: 'Lorem Ipsum' },
      { id: 'sub8', label: 'Lorem Ipsum' },
      { id: 'sub9', label: 'Lorem Ipsum' },
    ],
  },
  {
    id: 'group2',
    label: 'Lorem Ipsum',
    type: 'group',
  },
  {
    id: 'item4',
    label: 'Lorem Ipsum',
    icon: Help,
    type: 'item',
  },
  {
    id: 'item5',
    label: 'Lorem Ipsum',
    icon: Info,
    type: 'item',
  },
  {
    id: 'item6',
    label: 'Lorem Ipsum',
    icon: GetApp,
    type: 'item',
  },
];

const NavItem = ({ item, level = 0, expanded, onExpandToggle, selected, onSelect }) => {
  const isExpanded = expanded[item.id];

  if (item.type === 'group') {
    return (
      <div
        style={{
          paddingLeft: 16,
          paddingTop: level === 0 ? 24 : 16,
          paddingBottom: 8,
        }}
      >
        <span
          style={{
            fontSize: TYPOGRAPHY.groupHeaderSize,
            fontFamily: TYPOGRAPHY.fontFamily,
            fontWeight: TYPOGRAPHY.fontWeightMedium,
            color: COLORS.textPrimary,
            display: 'block',
          }}
        >
          {item.label}
        </span>
      </div>
    );
  }

  const Icon = item.icon;
  const isSelected = selected === item.id;
  const hasChildren = item.children && item.children.length > 0;
  const itemLevel = level;
  const fontSize = itemLevel === 0 ? TYPOGRAPHY.primarySize : TYPOGRAPHY.secondarySize;
  const paddingLeft = itemLevel === 0 ? 16 : (16 + 32 + (itemLevel - 1) * 20);

  return (
    <div key={item.id}>
      <div
        onClick={() => {
          if (hasChildren) {
            onExpandToggle(item.id);
          } else {
            onSelect(item.id);
          }
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: `8px 12px 8px ${paddingLeft}px`,
          cursor: 'pointer',
          backgroundColor: isSelected ? COLORS.selectedBg : 'transparent',
          color: isSelected ? COLORS.primary : COLORS.textPrimary,
          transition: 'background-color 0.2s',
          ':hover': { backgroundColor: COLORS.hoverBg },
          ...(isSelected ? {
            backgroundColor: COLORS.selectedBg,
            color: COLORS.primary,
          } : {}),
        }}
        onMouseEnter={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = COLORS.hoverBg;
          }
        }}
        onMouseLeave={(e) => {
          if (!isSelected) {
            e.currentTarget.style.backgroundColor = 'transparent';
          }
        }}
      >
        {Icon && <Icon sx={{ fontSize: 20, marginRight: '12px', flexShrink: 0 }} />}
        <span
          style={{
            fontSize,
            fontFamily: TYPOGRAPHY.fontFamily,
            fontWeight: TYPOGRAPHY.fontWeightRegular,
            flex: 1,
          }}
        >
          {item.label}
        </span>
        {hasChildren && (
          <ChevronRight
            sx={{
              fontSize: 20,
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s',
              flexShrink: 0,
            }}
          />
        )}
      </div>

      {hasChildren && isExpanded && (
        <div>
          {item.children.map((child) => (
            <NavItem
              key={child.id}
              item={child}
              level={itemLevel + 1}
              expanded={expanded}
              onExpandToggle={onExpandToggle}
              selected={selected}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidenav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState('item1');
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleExpandToggle = (itemId) => {
    setExpanded((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSelect = (itemId) => {
    setSelected(itemId);
  };

  if (isCollapsed) {
    return (
      <div
        style={{
          width: 64,
          height: '100vh',
          backgroundColor: COLORS.white,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '16px 0',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          fontFamily: TYPOGRAPHY.fontFamily,
        }}
      >
        <button
          onClick={() => setIsCollapsed(false)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 16,
            color: COLORS.primary,
          }}
        >
          <ChevronRight sx={{ fontSize: 20, color: COLORS.primary }} />
        </button>

        <div style={{ flex: 1, width: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
          {navItems.map((item) => {
            if (item.type === 'group') {
              return (
                <div
                  key={item.id}
                  style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: COLORS.divider,
                    margin: '16px 0',
                    flexShrink: 0,
                  }}
                />
              );
            }
            if (item.type === 'item' && item.icon) {
              const Icon = item.icon;
              const isSelected = selected === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelect(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? COLORS.primary : COLORS.textPrimary,
                    backgroundColor: isSelected ? COLORS.selectedBg : 'transparent',
                    borderRadius: '4px',
                    margin: '2px 4px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = COLORS.hoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </button>
              );
            }
            if (item.type === 'expandable' && item.icon) {
              const Icon = item.icon;
              const isSelected = selected === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onExpandToggle(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isSelected ? COLORS.primary : COLORS.textPrimary,
                    backgroundColor: isSelected ? COLORS.selectedBg : 'transparent',
                    borderRadius: '4px',
                    margin: '4px 8px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = COLORS.hoverBg;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                </button>
              );
            }
            return null;
          })}
        </div>

        <div style={{ width: 'calc(100% - 32px)', height: '1px', backgroundColor: COLORS.divider, marginLeft: '16px', marginRight: '16px', marginTop: '16px', flexShrink: 0 }} />

        <div
          style={{
            padding: '12px 8px',
            display: 'flex',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <button
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AccountCircle sx={{ fontSize: 28, color: COLORS.primary }} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        .sidenav-scrollable {
          scrollbar-width: none;
        }
        .sidenav-scrollable::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    <div
      style={{
        width: 296,
        height: '100vh',
        backgroundColor: COLORS.white,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: TYPOGRAPHY.fontFamily,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Top Section */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            backgroundColor: COLORS.primary,
            borderRadius: 4,
            marginRight: 12,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: TYPOGRAPHY.primarySize,
            fontWeight: TYPOGRAPHY.fontWeightMedium,
            color: COLORS.primary,
            flex: 1,
          }}
        >
          Lorem Ipsum
        </span>
        <button
          onClick={() => setIsCollapsed(true)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px 8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ChevronLeft sx={{ fontSize: 24, color: COLORS.primary }} />
        </button>
      </div>
      <div style={{ width: 'calc(100% - 32px)', height: '1px', backgroundColor: COLORS.divider, marginLeft: '16px', flexShrink: 0 }} />

      {/* Navigation Items */}
      <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <div className="sidenav-scrollable" style={{ flex: 1, overflowY: 'auto', scrollbarWidth: 'none', minHeight: 0 }}>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              item={item}
              level={0}
              expanded={expanded}
              onExpandToggle={handleExpandToggle}
              selected={selected}
              onSelect={handleSelect}
            />
          ))}
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '40px',
            background: 'linear-gradient(to bottom, transparent, #ffffff)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Bottom Account Section */}
      <div style={{ width: 'calc(100% - 32px)', height: '1px', backgroundColor: COLORS.divider, marginLeft: '16px', flexShrink: 0 }} />
      <div
        style={{
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexShrink: 0,
          position: 'relative',
        }}
        onClick={(e) => {
          if (e.target.closest('button') === e.currentTarget.querySelector('button')) return;
          if (accountMenuOpen) setAccountMenuOpen(false);
        }}
      >
        <AccountCircle sx={{ fontSize: 32, color: COLORS.primary, flexShrink: 0 }} />
        <span
          style={{
            fontSize: TYPOGRAPHY.primarySize,
            fontFamily: TYPOGRAPHY.fontFamily,
            fontWeight: TYPOGRAPHY.fontWeightRegular,
            color: COLORS.textPrimary,
            flex: 1,
          }}
        >
          Account Name
        </span>
        <button
          onClick={() => setAccountMenuOpen(!accountMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <MoreVert sx={{ fontSize: 20, color: COLORS.textPrimary }} />
        </button>

        {accountMenuOpen && (
          <div
            style={{
              position: 'absolute',
              bottom: '100%',
              right: '-85px',
              width: 'auto',
              marginBottom: '8px',
              backgroundColor: COLORS.white,
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              zIndex: 1000,
              whiteSpace: 'nowrap',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {[
              { label: 'User Settings', icon: SettingsOutlined },
              { label: 'Mission Settings', icon: TuneOutlined },
              { label: 'API Query Builder', icon: OpenInNewOutlined },
              { label: 'Contact Us', icon: PhoneOutlined },
              { label: 'Release Notes', icon: ChatOutlined },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  cursor: 'pointer',
                  color: COLORS.textPrimary,
                  fontSize: '16px',
                  fontFamily: TYPOGRAPHY.fontFamily,
                  fontWeight: TYPOGRAPHY.fontWeightRegular,
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <item.icon sx={{ fontSize: 20, color: COLORS.textPrimary }} />
                <span>{item.label}</span>
              </div>
            ))}

            <div
              style={{
                height: '1px',
                backgroundColor: COLORS.divider,
                margin: '8px 0',
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                cursor: 'pointer',
                color: COLORS.textPrimary,
                fontSize: '16px',
                fontFamily: TYPOGRAPHY.fontFamily,
                fontWeight: TYPOGRAPHY.fontWeightRegular,
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.hoverBg;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <LogoutOutlined sx={{ fontSize: 20, color: COLORS.textPrimary }} />
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>

      {accountMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setAccountMenuOpen(false)}
        />
      )}
    </div>
    </>
  );
};

export default Sidenav;
