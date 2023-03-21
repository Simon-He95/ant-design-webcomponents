---
title: Select
lang: en-US
---

# Select

When there are plenty of options, use a drop-down menu to display and select desired ones.

:::tip

This component requires the `<client-only></client-only>` wrap when used in SSR (eg: [Nuxt](https://nuxt.com/v3)) and SSG (eg: [VitePress](https://vitepress.vuejs.org/)).

:::

## Basic usage

:::demo `v-model` is the value of `el-option` that is currently selected.

select/basic-usage

:::

## Disabled option

:::demo Set the value of `disabled` in `el-option` to `true` to disable this option.

select/disabled-option

:::

## Disabled select

Disable the whole component.

:::demo Set `disabled` of `el-select` to make it disabled.

select/disabled

:::

## Clearable single select

You can clear Select using a clear icon.

:::demo Set `clearable` attribute for `el-select` and a clear icon will appear. Note that `clearable` is only for single select.

select/clearable

:::

## Basic multiple select

Multiple select uses tags to display selected options.

:::demo Set `multiple` attribute for `el-select` to enable multiple mode. In this case, the value of `v-model` will be an array of selected options. By default the selected options will be displayed as Tags. You can collapse them to a text by using `collapse-tags` attribute. You can check them when mouse hover collapse text by using `collapse-tags-tooltip` attribute.

select/multiple

:::

## Custom template

You can customize HTML templates for options.

:::demo Insert customized HTML templates into the slot of `el-option`.

select/custom-template

:::

## Grouping

Display options in groups.

:::demo Use `el-option-group` to group the options, and its `label` attribute stands for the name of the group.

select/grouping

:::

## Option filtering

You can filter options for your desired ones.

:::demo Adding `filterable` to `el-select` enables filtering. By default, Select will find all the options whose `label` attribute contains the input value. If you prefer other filtering strategies, you can pass the `filter-method`. `filter-method` is a `Function` that gets called when the input value changes, and its parameter is the current input value.

select/filterable

:::

## Remote Search

Enter keywords and search data from server.

:::demo Set the value of `filterable` and `remote` with `true` to enable remote search, and you should pass the `remote-method`. `remote-method` is a `Function` that gets called when the input value changes, and its parameter is the current input value. Note that if `el-option` is rendered with the `v-for` directive, you should add the `key` attribute for `el-option`. Its value needs to be unique, such as `item.value` in the following example.

select/remote-search

:::

## Create new items

Create and select new items that are not included in select options

:::demo By using the `allow-create` attribute, users can create new items by typing in the input box. Note that for `allow-create` to work, `filterable` must be `true`. This example also demonstrates `default-first-option`. When this attribute is set to `true`, you can select the first option in the current option list by hitting enter without having to navigate with mouse or arrow keys.

select/allow-create

:::

:::tip

If the binding value of Select is an object, make sure to assign `value-key` as its unique identity key name.

:::

## Select Attributes

| Name                               | Description                                                                                                                 | Type                                       | Accepted Values                                                                                           | Default          |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------------------------------------------------------------------------- | ---------------- |
| model-value / v-model              | binding value                                                                                                               | array / string / number / boolean / object | —                                                                                                         | —                |
| multiple                           | whether multiple-select is activated                                                                                        | boolean                                    | true / false                                                                                              | false            |
| disabled                           | whether Select is disabled                                                                                                  | boolean                                    | true / false                                                                                              | false            |
| value-key                          | unique identity key name for value, required when value is an object                                                        | string                                     | —                                                                                                         | value            |
| size                               | size of Input                                                                                                               | string                                     | large/default/small                                                                                       | default          |
| clearable                          | whether select can be cleared                                                                                               | boolean                                    | true / false                                                                                              | false            |
| collapse-tags                      | whether to collapse tags to a text when multiple selecting                                                                  | boolean                                    | true / false                                                                                              | false            |
| collapse-tags-tooltip              | whether show all selected tags when mouse hover text of collapse-tags. To use this, `collapse-tags` must be true            | boolean                                    | true / false                                                                                              | false            |
| multiple-limit                     | maximum number of options user can select when `multiple` is `true`. No limit when set to 0                                 | number                                     | —                                                                                                         | 0                |
| name                               | the name attribute of select input                                                                                          | string                                     | —                                                                                                         | —                |
| effect                             | Tooltip theme, built-in theme: `dark` / `light`                                                                             | string                                     | string                                                                                                    | light            |
| autocomplete                       | the autocomplete attribute of select input                                                                                  | string                                     | —                                                                                                         | off              |
| placeholder                        | placeholder                                                                                                                 | string                                     | —                                                                                                         | Select           |
| filterable                         | whether Select is filterable                                                                                                | boolean                                    | true / false                                                                                              | false            |
| allow-create                       | whether creating new items is allowed. To use this, `filterable` must be true                                               | boolean                                    | true / false                                                                                              | false            |
| filter-method                      | custom filter method                                                                                                        | function                                   | —                                                                                                         | —                |
| remote                             | whether options are loaded from server                                                                                      | boolean                                    | true / false                                                                                              | false            |
| remote-method                      | custom remote search method                                                                                                 | function                                   | —                                                                                                         | —                |
| remote-show-suffix                 | in remote search method show suffix icon                                                                                    | boolean                                    | true / false                                                                                              | false            |
| loading                            | whether Select is loading data from server                                                                                  | boolean                                    | true / false                                                                                              | false            |
| loading-text                       | displayed text while loading data from server                                                                               | string                                     | —                                                                                                         | Loading          |
| no-match-text                      | displayed text when no data matches the filtering query, you can also use slot `empty`                                      | string                                     | —                                                                                                         | No matching data |
| no-data-text                       | displayed text when there is no options, you can also use slot `empty`                                                      | string                                     | —                                                                                                         | No data          |
| popper-class                       | custom class name for Select's dropdown                                                                                     | string                                     | —                                                                                                         | —                |
| popper-options                     | Customized popper option see more at [popper.js](https://popper.js.org/docs/v2/)                                            | object                                     | —                                                                                                         | —                |
| reserve-keyword                    | when `multiple` and `filter` is true, whether to reserve current keyword after selecting an option                          | boolean                                    | true / false                                                                                              | true             |
| default-first-option               | select first matching option on enter key. Use with `filterable` or `remote`                                                | boolean                                    | true / false                                                                                              | false            |
| popper-append-to-body(deprecated)  | whether to append the popper menu to body. If the positioning of the popper is wrong, you can try to set this prop to false | boolean                                    | true / false                                                                                              | true             |
| teleported                         | whether select dropdown is teleported to the body                                                                           | boolean                                    | true / false                                                                                              | true             |
| persistent                         | when select dropdown is inactive and `persistent` is `false`, select dropdown will be destroyed                             | boolean                                    | true / false                                                                                              | true             |
| automatic-dropdown                 | for non-filterable Select, this prop decides if the option menu pops up when the input is focused                           | boolean                                    | true / false                                                                                              | false            |
| clear-icon                         | Custom clear icon component                                                                                                 | `string \| Component`                      | —                                                                                                         | CircleClose      |
| fit-input-width                    | whether the width of the dropdown is the same as the input                                                                  | boolean                                    | true / false                                                                                              | false            |
| suffix-icon                        | Custom suffix icon component                                                                                                | `string \| Component`                      | —                                                                                                         | ArrowDown        |
| suffix-transition<DeprecatedTag /> | animation when dropdown appears/disappears icon                                                                             | boolean                                    | true / false                                                                                              | true             |
| tag-type                           | tag type                                                                                                                    | string                                     | success/info/warning/danger                                                                               | info             |
| validate-event                     | whether to trigger form validation                                                                                          | boolean                                    | true / false                                                                                              | true             |
| placement                          | position of dropdown                                                                                                        | string                                     | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | bottom-start     |

:::warning

`suffix-transition` has been **deprecated**, and **will be** removed in<VersionTag version="2.3.0" />, please use override style scheme.

:::

## Select Events

| Name           | Description                                                   | Parameters                                |
| -------------- | ------------------------------------------------------------- | ----------------------------------------- |
| change         | triggers when the selected value changes                      | current selected value                    |
| visible-change | triggers when the dropdown appears/disappears                 | true when it appears, and false otherwise |
| remove-tag     | triggers when a tag is removed in multiple mode               | removed tag value                         |
| clear          | triggers when the clear icon is clicked in a clearable Select | —                                         |
| blur           | triggers when Input blurs                                     | (event: FocusEvent)                       |
| focus          | triggers when Input focuses                                   | (event: FocusEvent)                       |

## Select Slots

| Name   | Description                      | Subtags               |
| ------ | -------------------------------- | --------------------- |
| —      | Option component list            | Option Group / Option |
| prefix | content as Select prefix         | —                     |
| empty  | content when there is no options | —                     |

## Option Group Attributes

| Name     | Description                                  | Type    | Accepted Values | Default |
| -------- | -------------------------------------------- | ------- | --------------- | ------- |
| label    | name of the group                            | string  | —               | —       |
| disabled | whether to disable all options in this group | boolean | —               | false   |

## Option Group Slots

| Name | Description               | Subtags |
| ---- | ------------------------- | ------- |
| -    | customize default content | Option  |

## Option Attributes

| Name     | Description                                 | Type                               | Accepted Values | Default |
| -------- | ------------------------------------------- | ---------------------------------- | --------------- | ------- |
| value    | value of option                             | string / number / boolean / object | —               | —       |
| label    | label of option, same as `value` if omitted | string/number                      | —               | —       |
| disabled | whether option is disabled                  | boolean                            | —               | false   |

## Option Slots

| Name | Description               |
| ---- | ------------------------- |
| —    | customize default content |

## Methods

| Method | Description                                     | Parameters |
| ------ | ----------------------------------------------- | ---------- |
| focus  | focus the Input component                       | -          |
| blur   | blur the Input component, and hide the dropdown | -          |
