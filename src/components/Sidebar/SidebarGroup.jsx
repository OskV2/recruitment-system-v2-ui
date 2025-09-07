const SidebarGroup = ({ groupTitle, children }) => {
  return (
    <div className="flex flex-col mb-12 text-sidebar-foreground">
      <p className="mb-2 text-text-sidebar-foreground text-sm">{groupTitle}</p>
      {children}
    </div>
  );
};

export default SidebarGroup;
