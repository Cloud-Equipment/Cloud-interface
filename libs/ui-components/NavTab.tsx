import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';

function samePageLinkNavigation(
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
) {
  if (
    event.defaultPrevented ||
    event.button !== 0 || // ignore everything but left-click
    event.metaKey ||
    event.ctrlKey ||
    event.altKey ||
    event.shiftKey
  ) {
    return false;
  }
  return true;
}

interface LinkTabProps {
  label: string;
  href: string;
  selected?: boolean;
}

function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        navigate(props.href);
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

export const NavTab: React.FC<{
  links: LinkTabProps[];
  wrapperClass: string;
}> = ({ links, wrapperClass }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // event.type can be equal to focus with selectionFollowsFocus.
    if (
      event.type !== 'click' ||
      (event.type === 'click' &&
        samePageLinkNavigation(
          event as React.MouseEvent<HTMLAnchorElement, MouseEvent>
        ))
    ) {
      setValue(newValue);
    }
  };

  return (
    <div className={`${wrapperClass}`}>
      <Tabs value={value} onChange={handleChange} role="navigation">
        {links.map((x, i) => (
          <LinkTab key={i} label={x.label} href={x.href} />
        ))}
      </Tabs>
    </div>
  );
};
