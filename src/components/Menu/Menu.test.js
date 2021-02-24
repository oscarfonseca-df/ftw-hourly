import React from 'react';
import { renderDeep } from '../../util/test-helpers';
import { MenuItem, MenuLabel, MenuContent } from "..";
import Menu from './Menu';

describe('menu', () => {
  it('matches snapshot', () => {
    const tree = renderDeep(
      <Menu>
        <MenuLabel>Label</MenuLabel>
        <MenuContent>
          <MenuItem key="1">Menu item 1</MenuItem>
          <MenuItem key="2">Menu item 2</MenuItem>
        </MenuContent>
      </Menu>
    );
    expect(tree).toMatchSnapshot();
  });
});
