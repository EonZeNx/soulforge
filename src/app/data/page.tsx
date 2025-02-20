'use client';

import {TagDataView} from "@/components/data/tag_data_view";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";

export default function Page() {
  const [value, setValue] = useState('1');

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <main style={{width: "1200px"}}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange}>
              <Tab label="Tags" value="1" />
            </TabList>
          </Box>

          <TabPanel value="1">
            <TagDataView />
          </TabPanel>
        </TabContext>
      </main>
    </div>
  );
}
