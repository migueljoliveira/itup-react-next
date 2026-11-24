interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (<>
            <header><h1>Task Manager</h1> </header> 
            <main>{children}</main><footer>Footer content</footer>
            </>)
}
