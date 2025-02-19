'use client';

import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Card, Tab, useTheme} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {Lore} from "@/components/character/lore";
import {CharacterArchetype} from "@/components/character/archetypes/character-archetype";
import {Keystone} from "@/components/character/keystones/keystone";
import {Kinfolk} from "@/components/character/kinfolk/kinfolk";
import {TemporaryTags} from "@/components/character/temporary_tags";
import {Afflictions} from "@/components/character/afflictions";
import Grid from "@mui/material/Grid2";
import {Resources} from "@/components/character/resource/resources";
import {CharacterProvider} from "@/context/character/character-provider";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";
import {MainHeader} from "@/components/main/main-header";


export default function Home() {
  const [value, setValue] = useState('1');
  const theme = useTheme();
  const isSmall = useBreakpointMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const smallLayout = (<>
    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
      <TabList onChange={handleChange} variant="scrollable" scrollButtons="auto">
        <Tab label="Character" value="1"/>
        <Tab label="Keystone" value="2"/>
        <Tab label="Archetype" value="3"/>
        <Tab label="Kinfolk" value="4"/>
        <Tab label="Temporary Tags" value="5"/>
        <Tab label="Afflictions" value="6"/>
      </TabList>
    </Box>

    <TabPanel value="1">
      <Lore/>
      <Resources sx={{mt: 4}}/>
    </TabPanel>

    <TabPanel value="2">
      <Keystone/>
    </TabPanel>

    <TabPanel value="3">
      <CharacterArchetype/>
    </TabPanel>

    <TabPanel value="4">
      <Kinfolk/>
    </TabPanel>

    <TabPanel value="5">
      <TemporaryTags/>
    </TabPanel>

    <TabPanel value="6">
      <Afflictions/>
    </TabPanel>
  </>);

  const mediumLayout = (<>
    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
      <TabList onChange={handleChange}>
        <Tab label="Character" value="1"/>
        <Tab label="Keystone" value="2"/>
        <Tab label="Archetype" value="3"/>
        <Tab label="Kinfolk" value="4"/>
        <Tab label="Status" value="5"/>
      </TabList>
    </Box>

    <TabPanel value="1">
      <Lore/>
      <Resources sx={{mt: 4}}/>
    </TabPanel>

    <TabPanel value="2">
      <Keystone/>
    </TabPanel>

    <TabPanel value="3">
      <CharacterArchetype/>
    </TabPanel>

    <TabPanel value="4">
      <Kinfolk/>
    </TabPanel>

    <TabPanel value="5">
      <Grid container spacing={2}>
        <Grid size={6}>
          <TemporaryTags/>
        </Grid>

        <Grid size={6}>
          <Afflictions/>
        </Grid>
      </Grid>
    </TabPanel>
  </>);

  return (
    <CharacterProvider>
      <main style={{maxWidth: "100%", margin: theme.spacing(2), display: "flex", justifyContent: "center"}}>
        <Box sx={{width: "100%", maxWidth: isSmall ? "100%" : "1000px"}}>
          <MainHeader isSmall={isSmall}/>

          <TabContext value={value}>
            <Card variant="outlined" sx={{mt: 4, mb: 12}}>
              {isSmall ? smallLayout : mediumLayout}
            </Card>
          </TabContext>
        </Box>
      </main>
    </CharacterProvider>
  );
}
