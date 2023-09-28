type AdditionalParam = {
  url: string;
  title: {};
};

type Action = {
  title: string;
  href: string;
  $: AdditionalParam;
};

type Image = {
  filename: string;
  url: string;
  $: AdditionalParam;
};

export { Action, Image };
