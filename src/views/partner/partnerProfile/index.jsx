import { Avatar, Box, Flex, Icon, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VisuallyHidden, VisuallyHiddenInput } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import Image from "views/partner/partnerProfile/assets/avatar1.png";
import Personal from './components/personal';
import BusinessInfo from './components/businessInfo';
import Bank from './components/bank';
import Verification from './components/verification';
import Services from './components/services';
import { FaRegEdit } from 'react-icons/fa';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from 'config/firebase';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from 'config/firebase';
import { getCurrentPartner } from 'services/PartnerService';
import { Spinner } from 'react-bootstrap';

const Profile = () => {
    const profilePicInputRef = useRef(null);
    const [profilePicture, setProfilePicture] = useState(Image);
    const [partnerId, setPartnerId] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [partnerData,setPartnerData]=useState({})
    useEffect(() => {
        getPartnerProfile()
    }, [])

    const handleSelectFile = async (event) => {
        setIsLoading(true)
        if(event.target.files && event.target.files.length>0){
            const file = event.target.files[0];
            const fileName = file.name;
            const storageRef = ref(storage, `profilePicture/${fileName}`);
            try {
                await uploadBytes(storageRef, file);
                const downloadUrl = await getDownloadURL(storageRef);
                const profileRef = doc(db, "partners", partnerId);
                await updateDoc(profileRef, { profile: downloadUrl });
                setProfilePicture(downloadUrl);
    
            } catch (error) {
                console.error('Upload error:', error);
            } finally{
                setIsLoading(false)
            }
        }
       
    }

    const getPartnerProfile = async () => {
        try {
            const partnerUid = sessionStorage.getItem('uid')
            const queryForGetPartner = query(collection(db, "partners"), where("uid", "==", partnerUid));
            const querySnapshot = await getDocs(queryForGetPartner);
            if (!querySnapshot.empty) {
                const partnerData = querySnapshot.docs[0]?.data();
                const partnerId=querySnapshot.docs[0]?.id
                setPartnerData(partnerData)
                setPartnerId(partnerId)
                setProfilePicture(partnerData?.profile);
            } 
        } catch (error) {
            console.error("Error getting partner profile:", error.message);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="d-flex flex-row mb-3">
            {isLoading && (
                <Flex justifyContent={'center'}>
                    <Spinner size="xl" marginTop={'5rem'} backdropBlur="blur" />
                </Flex>
            )}
            <Flex alignItems="center">
                <Box>
                    <Avatar size='2xl' name={partnerData.firstName} src={profilePicture} />
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        className='hidden'
                        ref={profilePicInputRef}
                        onChange={handleSelectFile}
                        style={{ display: "none" }}
                    />
                </Box>

                <Flex ml="1rem" flexDirection="column">
                    <Text fontSize="2rem" fontWeight="bold">{partnerData?.firstName??""} {partnerData?.middleName??""} {partnerData?.lastName??""}</Text>
                    <Text>Profile Completion : 100%</Text>
                    <Icon as={FaRegEdit} w="1.5rem" h="1.5rem" onClick={() => { profilePicInputRef.current.click() }} cursor="pointer" />
                </Flex>
            </Flex>
            <div style={{ marginTop: "2rem" }} >
                <Tabs variant='soft-rectangle' colorScheme='#FFFFFF' >
                    <TabList ml='4' mr='3'>
                        <Tab backgroundColor="#FFFFFF" mr='6' borderRadius="8px" paddingInline={'5'}>Personal</Tab>
                        <Tab backgroundColor="#FFFFFF" mr='6' borderRadius="8px" paddingInline={'5'}>Business Info</Tab>
                        <Tab backgroundColor="#FFFFFF" mr='6' borderRadius="8px" paddingInline={'5'}>Bank</Tab>
                        <Tab backgroundColor="#FFFFFF" mr='6' borderRadius="8px" paddingInline={'5'}>Verification</Tab>
                        <Tab backgroundColor="#FFFFFF" mr='6' borderRadius="8px" paddingInline={'5'}>Services</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <Personal />
                        </TabPanel>
                        <TabPanel>
                            <BusinessInfo />
                        </TabPanel>
                        <TabPanel>
                            <Bank />
                        </TabPanel>
                        <TabPanel>
                            <Verification />
                        </TabPanel>
                        <TabPanel>
                            <Services />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </div>
        </div>
    )
}

export default Profile
