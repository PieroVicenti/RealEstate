import Link from 'next/link';
import Image from 'next/image';
import {Flex, Box, Text, Button} from '@chakra-ui/react';
import {baseUrl, fetchApi} from '../utils/fetchApi';
import Property from '../components/Property';



const Banner = ({purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
     <Image src={imageUrl} width={500} height={300} alt="banner"/>
     <Box p="5">
        <Text color="gray.500" fontSize="sm" font-wight="medium">{purpose}</Text>
        <Text fontSize="3xl" font-wight="bold">{title1}<br />{title2}</Text>
        <Text  fontSize="lg" paddingTop="3px" paddingBottom="3px" color="gray.700">{desc1}<br />{desc2}</Text>
        <Button fontSize="x1">
          <Link href={linkName}>{buttonText}</Link>
        </Button>
     </Box>
  </Flex>
)


export default function Home({propertiesForRent, propertiesForSale}) {
  return (
    <Box>
       <Banner 
       purpose="RENT A HOUSE"
       title1="Renatl Houses for"
       title2="Everyone"
       desc1="Explore apartments, Villas, Houses"
       desc2="and more..."
       buttonText="Explore Renting"
       linkName="/search?purpose=for-rent"
       imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
        />
        <Flex flexWrap="wrap">
           {/*Fetch the properties and map over them */}
           {propertiesForRent.map((property)=>
             <Property property={property} key={property.id}/>
           )}
        </Flex>
       <Banner
       purpose="BUY A HOUSE"
       title1="Find, Buy $ Own Your"
       title2="Drem Home"
       desc1="Explore apartments, Villas, Houses"
       desc2="and more..."
       buttonText="Explore Buying"
       linkName="/search?purpose=for-sale"
       imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
        />
           {propertiesForSale.map((property)=>
             <Property property={property} key={property.id}/>
           )}  
    </Box>
  )
}

//special function from Next.js
export async function getStaticProps(){
   const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
   const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);


   //return this to pass the properties to the component, and Next.js gives these props to the main component on the top
   return{
     props: {
       propertiesForSale : propertyForSale?.hits,
       propertiesForRent : propertyForRent?.hits,
     }
   }
}