import _ from 'lodash';

const Bold = ({ children }) => {
  return `<span class="font-bold text-blue-500"> ${children} </span>`;
};

const Heading1 = ({ children }) =>
  `<div class="mb-4">
    <span class="text-4xl md:text-6xl font-bold text-white">

      ${children}

    </span>{' '}
  </div>`;

const Heading2 = ({ children }) =>
  `<div class="mb-4">
    <span class="text-3xl md:text-5xl font-bold text-white">

      ${children}

    </span>{' '}
  </div>`;

const Parag = ({ children }) =>
  `<div class="mb-4 ">
    <p class=""> ${children} </p>{' '}
  </div>`;

const HyperLNK = ({ node, children }) => {
  const URI = _.get(node, 'data.uri');
  return `<span class="text-4xlx md:text-6xlx text-blue-200 font-bold">

      <a href=${URI} target="_blank" rel="noreferrer">

        ${children}

      </a>

    </span>`;
};

const richtextRenderOptions = {
  bold: (text) => Bold({ children: text }),
  h1: (node, next) => Heading1({ children: next(node.children) }),
  h2: (node, next) => Heading2({ children: next(node.children) }),
  p: (node, next) => Parag > { children: next(node.children) },
  link: (entry, metadata) => HyperLNK({ node: entry, children: metadata.text }),
};

export default richtextRenderOptions;
