interface ILinks {
    id: number;
    title: string;
    href: string;
  }
  
  const LINKS: ILinks[] = [
    {
      id: 0,
      title: 'Hjem',
      href: '/',
    },
    {
      id: 1,
      title: 'ds',
      href: '/BlogSidebarPage',
    },
    {
      id: 2,
      title: 'Kategorier',
      href: '/kategorier',
    },
  ];
  
  export default LINKS;
  