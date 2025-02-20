'use client';

import {TabContext, TabList, TabPanel} from "@mui/lab";
import {Box, Card, Tab, useTheme} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import {Lore} from "@/components/character/lore";
import {Archetype} from "@/components/character/archetypes/archetype";
import {Keystone} from "@/components/character/keystones/keystone";
import {Kinfolk} from "@/components/character/kinfolk/kinfolk";
import {TemporaryTags} from "@/components/character/temporary-tags/temporary-tags";
import {Afflictions} from "@/components/character/afflictions/afflictions";
import {Resources} from "@/components/character/resource/resources";
import {CharacterProvider} from "@/context/character/character-provider";
import {useBreakpointMediaQuery} from "@/hooks/use-screen-breakpoints";
import {MainHeader} from "@/components/main/main-header";
import {Attributes} from "@/components/character/attributes/attributes";
import {Notes} from "@/components/character/notes";
import {DiceRoller} from "@/components/data/dice/dice-roller";


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
        <Tab label="Dice" value="7"/>
      </TabList>
    </Box>

    <TabPanel value="1">
      <Lore sx={{mt: 3}}/>
      <Attributes sx={{mt: 3}}/>
      <Notes sx={{mt: 3}}/>
      <Resources sx={{mt: 3}}/>
    </TabPanel>

    <TabPanel value="2">
      <Keystone/>
    </TabPanel>

    <TabPanel value="3">
      <Archetype/>
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

    <TabPanel value="7">
      <DiceRoller/>
    </TabPanel>
  </>);

  const mediumLayout = (<>
    <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
      <TabList onChange={handleChange}>
        <Tab label="Character" value="1"/>
        <Tab label="Keystone" value="2"/>
        <Tab label="Archetype" value="3"/>
        <Tab label="Kinfolk" value="4"/>
        <Tab label="Temporary Tags" value="5"/>
        <Tab label="Afflictions" value="6"/>
        <Tab label="Dice" value="7"/>
      </TabList>
    </Box>

    <TabPanel value="1">
      <Lore/>
      <Attributes sx={{mt: 3}}/>
      <Notes sx={{mt: 3}}/>
      <Resources sx={{mt: 3}}/>
    </TabPanel>

    <TabPanel value="2">
      <Keystone/>
    </TabPanel>

    <TabPanel value="3">
      <Archetype/>
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

    <TabPanel value="7">
      <DiceRoller/>
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
