import React from 'react';
import { FieldTextInput } from "..";
import FilterPopup from './FilterPopup';

const id = 'FilterPopupExample';
const field = <FieldTextInput id={`${id}.input1`} label="Input:" name="input1" type="text" />;

export const FilterPopupExample = {
  component: FilterPopup,
  props: {
    id,
    liveEdit: false,
    showAsPopup: true,
    urlParam: 'example',
    initialValues: {},
    isSelected: false,
    contentPlacementOffset: -14,
    onSubmit: (urlParam, values) => {
      console.log(`onSubmit with urlParam: ${urlParam} and values: ${JSON.stringify(values)}`);
    },
    label: 'Example label',
    children: field,
  },
  group: 'misc',
};
