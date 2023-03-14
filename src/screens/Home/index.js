import React, { useEffect, useState } from "react"
import { FlatList, SafeAreaView, Text, View} from "react-native"
import AttractionCard from "../../components/AttractionCard"
import Categories from "../../components/Categories"
import Title from "../../components/Title"
import styles from "./styles"
import jsonData from "../../data/attractions.json"
import categories from "../../data/categories.json"
import { useNavigation} from "@react-navigation/native"

const ALL = "ALL"

const Home = () => {
    // you can access navigation as a prop from react-native/navigation 
    const navigation = useNavigation() 
    const [selectedCategory, setSelectedCategory] = useState(ALL)
    const [data, setData] = useState([])

    useEffect(() => {
      setData(jsonData)
    },[])

    useEffect(() => {
        if (selectedCategory === ALL) {
            setData(jsonData)
        } else {
            const filteredData = jsonData?.filter(item => item?.categories?.includes(selectedCategory))
            setData(filteredData)
        }
    },[selectedCategory])
    
     
    return (
        // for you to use FlatList , you need to have a ListHeader or List Footer component
        // to take everything on top and below the flatlist into the component so that the app does not break
        // take note, don't use FlatList in scroll View
        <SafeAreaView style={styles.container}>
        <FlatList 
         ListEmptyComponent={(<Text style={styles.emptyText}> No items found</Text>)}
         ListHeaderComponent={(
            <>
            <View style={{margin: 32}}> 
         <Title text="Where do" style={{fontWeight: "normal"}} />
          <Title text="you want to go" />
          <Title text="Explore Attraction" style={styles.subtitle}/>
          </View>

           <Categories 
           selectedCategory={selectedCategory} 
           onCategoryPress={setSelectedCategory} 
           categories={[ALL, ...categories]} 
        />
         
         </> 
        )}

        data={data} numColumns={2} style={{flexGrow: 1}} keyExtractor={(item, index) => index.toString()} 
        extraData={data}
        renderItem={({item, index})  => (
            <AttractionCard style={ index % 2 === 0 ? {marginRight: 12, marginLeft: 32} : {marginRight:32}}  subtitle={item.city} 
            imageSrc={ item.images?.length ? item.images[0] : null}
            id={index} 
            title={item.name}    
            onPress={() => navigation.navigate("AttractionDetails", {item:item})}
            /> 
        )}
        />
      
        </SafeAreaView>
    )  
}

// this will only rerender the component anytime props in the component change
export default React.memo(Home)








// import React, { useEffect, useState } from "react"
// import { FlatList, SafeAreaView, ScrollView} from "react-native"
// import AttractionCard from "../../components/AttractionCard"
// import Categories from "../../components/Categories"
// import Title from "../../components/Title"
// import styles from "./styles"
// import jsonData from "../../data/attractions.json"

// const Home = () => {
//     const [selectedCategory, setSelectedCategory] = useState("All")
//     const [data, setData] = useState([])

//     useEffect(() => {
//       setData(jsonData)
//     },[])
    
     
//     return (
//         <SafeAreaView>
//         <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
//           <Title text="Where do" style={{fontWeight: "normal"}} />
//           <Title text="you want to go" />
//           <Title text="Explore Attraction" style={styles.subtitle}/>
//            <Categories 
//            selectedCategory={selectedCategory} 
//            onCategoryPress={setSelectedCategory} 
//            categories={["All", "Popular", "Historical","Random",
//         "Trending", "Exclusive", "Others"]} 
//         />
//           <ScrollView contentContainerStyle={styles.row}>
//             {[...data,...data]?.map((item, index) => (
//                 // the styles checks if the index is an even number
//               <AttractionCard style={ index % 2 === 0 ? {marginRight: 12} : {}} key={item.id} subtitle={item.city} 
//               imageSrc={ item.images?.length ? item.images[0] : null}
//               title={item.name}
//               /> 
//             ))} 
//         </ScrollView>

//         <FlatList 
//         data={data} numColumns={2} keyExtractor={({item}) => String(item?.id)} renderItem={({item, index})  => (
//             <AttractionCard style={ index % 2 === 0 ? {marginRight: 12} : {}}  subtitle={item.city} 
//             imageSrc={ item.images?.length ? item.images[0] : null}
//             title={item.name}  
//             /> 
//         )}
//         />
//         </ScrollView>
//         </SafeAreaView>
//     )  
// }

// // this will only rerender the component anytime props in the component change
// export default React.memo(Home)

