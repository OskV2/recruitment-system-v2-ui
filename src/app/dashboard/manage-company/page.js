import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import TableLocations from '@/components/Tables/TableLocations';
import TableContractTypes from '@/components/Tables/TableContractTypes';

const manageCompanyPage = () => {
  return (
    <Tabs defaultValue="locations" className="w-100%">
      <TabsList>
        <TabsTrigger value="locations">Locations</TabsTrigger>
        <TabsTrigger value="ct">Contract Types</TabsTrigger>
        <TabsTrigger value="fte">Full Time Equivalents</TabsTrigger>
        <TabsTrigger value="wm">Work Models</TabsTrigger>
      </TabsList>

      <TabsContent value="locations">
        <TableLocations />
      </TabsContent>
      <TabsContent value="ct">
        <TableContractTypes />
      </TabsContent>
      <TabsContent value="fte">Full Time Equivalents</TabsContent>
      <TabsContent value="wm">Work Models</TabsContent>
    </Tabs>
  );
};

export default manageCompanyPage;
