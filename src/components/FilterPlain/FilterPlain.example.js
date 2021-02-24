import React from 'react';
import { FieldTextInput } from "..";
import FilterPlain from './FilterPlain';

const id = 'FilterPlainExample';
const field = <FieldTextInput id={`${id}.input1`} label="Input:" name="input1" type="text" />;

export const FilterPlainExample = {
  component: FilterPlain,
  props: {
    id,
    liveEdit: true,
    showAsPopup: false,
    isSelected: false,
    urlParam: 'example',
    initialValues: {},
    contentPlacementOffset: -14,
    onSubmit: (urlParam, values) => {
      console.log(`onSubmit with urlParam: ${urlParam} and values: ${JSON.stringify(values)}`);
    },
    label: 'Example label',
    children: field,
  },
  group: 'misc',
};
