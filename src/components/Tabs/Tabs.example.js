import React from 'react';
import PropTypes from 'prop-types';
import Tabs from './Tabs';

const TestPanel = props => <div>{props.children}</div>;

const { node } = PropTypes;

TestPanel.propTypes = {
  children: node.isRequired,
};

const selfLinkProps = {
  name: 'StyleguideComponent',
  params: { component: 'Tabs' },
};

const TabsWrapper = () => (
    <Tabs>
      <TestPanel tabId="Description" tabLabel="Description" tabLinkProps={selfLinkProps}>
        Description form stuff
      </TestPanel>
      <TestPanel selected tabId="Location" tabLabel="Location" tabLinkProps={selfLinkProps}>
        Location form stuff
      </TestPanel>
      <TestPanel disabled tabId="Price" tabLabel="Price" tabLinkProps={selfLinkProps}>
        Price form stuff
      </TestPanel>
    </Tabs>
  );

export const Example = {
  component: TabsWrapper,
  props: {},
  group: 'navigation',
};
