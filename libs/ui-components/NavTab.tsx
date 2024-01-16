import { Tabs, Tab } from '@mui/material';
import React from 'react';

interface TabProps {
  ariaLabel_?: string;
}

const NavTab: React.FC<TabProps> = ({ ariaLabel_ = 'Cloud-Interface-Tab' }) => {
  //   tabs
  const [tabValue, setTabValue] = React.useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  function a11yProps(index: number) {
    return {
      id: `${ariaLabel_}-${index}`,
      'aria-controls': `${ariaLabel_}-${index}`,
    };
  }

  return (
    <Tabs
      value={tabValue}
      onChange={handleTabChange}
      aria-label="basic tabs example"
    >
      <Tab label="Item One" {...a11yProps(1)} />
      <Tab label="Item Two" {...a11yProps(1)} />
      <Tab label="Item Three" {...a11yProps(2)} />
    </Tabs>
  );
};

export default NavTab;
