interface IFrontMatter {
  title: string
  subtitle: string
  background: "white" | "gray"
}

declare module "*.mdx" {
  let MDXComponent: (props: any) => JSX.Element
  let frontMatter: IFrontMatter

  export { frontMatter }
  export default MDXComponent
}
