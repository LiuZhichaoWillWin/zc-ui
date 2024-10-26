export const createNamespace = (namespace: string) => {
  return createBem(namespace);
};

const createBem = (namespace: string) => {
  const b = (block: string) => {
    return namespace + "-" + block;
  };
  const be = (block: string, element: string) => {
    return b(block) + "__" + element;
  };
  const bm = (block: string, modifer: string) => {
    return b(block) + "--" + modifer;
  };
  const bem = (block: string, element: string, modifer: string) => {
    return be(block, element) + "--" + modifer;
  };
  return {
    b,
    be,
    bm,
    bem,
  };
};
