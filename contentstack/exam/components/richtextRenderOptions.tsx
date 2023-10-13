import _ from 'lodash';
import {
  RenderOption,
  Next,
  Node,
  Metadata,
  EntryNode,
} from '@contentstack/utils';

const Bold = ({ children }: { children: string }): string => {
  return `<span class="font-bold text-blue-500"> ${children} </span>`;
};

const Heading1 = ({ children }: { children: string }): string =>
  `<div class="mb-4">
    <span class="text-4xl md:text-6xl font-bold text-white">

      ${children}

    </span>{' '}
  </div>`;

const Heading2 = ({ children }: { children: string }): string =>
  `<div class="mb-4">
    <span class="text-3xl md:text-5xl font-bold text-white">

      ${children}

    </span>{' '}
  </div>`;

const Parag = ({ children }: { children: string }): string =>
  `<div class="mb-4 ">
    <p class=""> ${children} </p>{' '}
  </div>`;

const HyperLNK = ({
  node,
  children,
}: {
  node: EntryNode;
  children: string;
}): string => {
  const URI = _.get(node, 'data.uri');
  return `<span class="text-4xlx md:text-6xlx text-blue-200 font-bold">

      <a href=${URI} target="_blank" rel="noreferrer">

        ${children}

      </a>

    </span>`;
};

const richtextRenderOptions = {
  bold: (text: string) => Bold({ children: text }),
  h1: (node: Node, next: Next) => Heading1({ children: next(node.children) }),
  h2: (node: Node, next: Next) => Heading2({ children: next(node.children) }),
  p: (node: Node, next: Next) => Parag({ children: next(node.children) }),
  link: (entry: EntryNode, metadata: Metadata) =>
    HyperLNK({ node: entry, children: metadata.text }),
} as RenderOption;

export default richtextRenderOptions;
