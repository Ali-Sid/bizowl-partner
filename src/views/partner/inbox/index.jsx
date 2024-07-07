import { Flex, Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React from 'react'
import Chat from './components/Chat'
import QueriesTable from './components/QueriesTable'

const Inbox = () => {
  return (
    <>
      {/* <Tabs
        position="relative"
        variant='unstyled'
      >
        <TabList>
          <Tab>Chat</Tab>
          <Tab>Queries</Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels>
          <TabPanel>
              <Chat />
          </TabPanel>
          <TabPanel>
            <QueriesTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Flex>

      </Flex> */}
    </>
  )
}

export default Inbox
