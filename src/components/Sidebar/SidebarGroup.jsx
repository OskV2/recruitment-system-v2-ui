const SidebarGroup = ({ groupTitle, children }) => {
  return (
    <div className="flex flex-col mb-8 text-sidebar-foreground">
      <p className="mb-2 text-sidebar-foreground text-xs">{groupTitle}</p>
      {children}
    </div>
  );
};

export default SidebarGroup;
