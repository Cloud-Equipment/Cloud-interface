import * as React from 'react';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  useParams,
  useLocation,
  useNavigate,
  createSearchParams,
} from 'react-router-dom';

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
  param: string;
  selected?: boolean;
  count?: number;
}

function LinkTab(props: LinkTabProps) {
  const navigate = useNavigate();
  const handleParamsChange = (params: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', params);

    // Use history.replace instead of history.push to update the URL without creating a new entry in the browser history
    navigate({
      pathname: location.pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        handleParamsChange(props.param);
      }}
      aria-current={props.selected && 'page'}
      {...props}
    />
  );
}

export const NavTab2: React.FC<{
  links: LinkTabProps[];
  wrapperClass?: string;
}> = ({ links, wrapperClass }) => {
  const [value, setValue] = React.useState(0);

  const location = useLocation();
  const selectedTab = new URLSearchParams(location.search).get('tab') || 'all';

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

  // persist tab selection on page refresh
  React.useEffect(() => {
    let activeTabIndex = links.findIndex((link) => {
      let len = `${link.param}`.split('/').length;
      return `${link.param}`.split('/')[len - 1] === selectedTab;
    });
    setValue(Math.max(activeTabIndex, 0));
  }, []);

  return (
    <div className={`${wrapperClass}`}>
      <Tabs value={value} onChange={handleChange} role="navigation">
        {links.map((x, i) => (
          <div className="flex gap-1 items-center">
            <LinkTab key={i} label={x.label} param={x.param} />{' '}
            {x?.count ? (
              <span className="rounded-full bg-primary-150 font-dmsans text-[8px] font-medium leading-[12px] flex items-center justify-center text-white w-4 h-4">
                {x?.count}
              </span>
            ) : null}
          </div>
        ))}
      </Tabs>
    </div>
  );
};
