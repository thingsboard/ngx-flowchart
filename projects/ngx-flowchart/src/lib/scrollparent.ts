///
/// SPDX-FileCopyrightText: Copyright 2016 ThingsBoard, Inc.
/// SPDX-License-Identifier: Apache-2.0
///
///
/// This file is a TypeScript adaptation of scrollparent.js
/// (https://github.com/olahol/scrollparent.js),
/// Copyright (c) 2014 Ola Holmström, licensed under the MIT License.
/// See licenses/LICENSE-scrollparent for the original licence text.
///
const regex = /(auto|scroll)/;

const style = (node: Element, prop: string): string =>
  getComputedStyle(node, null).getPropertyValue(prop);

const scroll = (node: Element) =>
  regex.test(
    style(node, 'overflow') +
    style(node, 'overflow-y') +
    style(node, 'overflow-x'));

const scrollparent = (node: HTMLElement): HTMLElement =>
  !node || node === document.body
    ? document.body
    : scroll(node)
    ? node
    : scrollparent(node.parentNode as HTMLElement);

export default scrollparent;
