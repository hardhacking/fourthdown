<template>
    <Head>
        <Title>NFL Schedule Release Analysis - ESPN Analytics</Title>
        <Meta property="og:title" content="NFL Schedule Release Analysis - ESPN Analytics"/>
        <Meta property="og:site_name" content="NFL Schedule Release Analysis - ESPN Analytics" />
        <Meta property="og:url" content="https://www.espnanalytics.com/schedule" />
        <Meta name="twitter:url" content="https://www.espnanalytics.com/schedule" />
        <Meta name="twitter:title" content="NFL Schedule Release Analysis - ESPN Analytics"/>
        <Meta name="title" content="NFL Schedule Release Analysis - ESPN Analytics"/>
    </Head>
    <div class="bg-white w-full">
        <Header></Header>
        <div class="flex justify-center items-center w-full">
            <select class="mt-24 rounded-sm bg-gray-50 w-[300px] h-[40px] border border-espngray-300 text-espngray-900 text-base focus:ring-blue-500 focus:border-blue-500 m-auto" v-model="selection">
                <option value="overall">All Charts</option>
                <option value="best">Best/Fewest</option>
                <option value="worst">Worst/Most</option>
                <option value="net">Net Rest</option>
                <option value="bye">Opponent Bye/Rest</option>
                <option value="weeks">Short Weeks</option>
                <option value="travel">Travel/Back-to-Backs</option>
                <option value="pain">Pain Index</option>
                <option value="prime">Primetime</option>
                <option value="afce">AFC East</option>
                <option value="afcn">AFC North</option>
                <option value="afcs">AFC South</option>
                <option value="afcw">AFC West</option>
                <option value="nfce">NFC East</option>
                <option value="nfcn">NFC North</option>
                <option value="nfcs">NFC South</option>
                <option value="nfcw">NFC West</option>
            </select>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-if="selection == 'overall'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_NET_REST_DIFFERENCE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_NET_REST_DIFFERENCE.jpg">
            </div>
            <!-- <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_TRAVEL_DIFF.jpg">
            </div> -->
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_BACK-TO-BACK_ROAD_TRIPS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_PRIMETIME_GAMES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_ROAD_WEEKS_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_ROAD_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_WEEKS_VS_OPPONENT_OFF_BYE.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_WKS_WITH_LESS_REST.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/LEAST_TRAVEL_MILES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_BACK-TO-BACK_ROAD_TRIPS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_NET_TRAVEL_MILES_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_PRIMETIME_GAMES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_SHORT_ROAD_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_SHORT_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_TOTAL_TRAVEL_MILES_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_TRAVEL_MILES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WEEKS_VS_OPPONENT_OFF_BYE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WEEKS_VS_OPPONENT_OFF_BYE.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WKS_WITH_LESS_REST.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PAIN_INDEX_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_NET_REST_DIFFERENCE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_NET_REST_DIFFERENCE.jpg">
            </div>
            <!-- <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_TRAVEL_DIFF.jpg">
            </div> -->
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'best'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_NET_REST_DIFFERENCE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_NET_REST_DIFFERENCE.jpg">
            </div>
            <!-- <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_TRAVEL_DIFF.jpg">
            </div> -->
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_BACK-TO-BACK_ROAD_TRIPS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_PRIMETIME_GAMES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_ROAD_WEEKS_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_ROAD_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_WEEKS_VS_OPPONENT_OFF_BYE.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_WKS_WITH_LESS_REST.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/LEAST_TRAVEL_MILES.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'worst'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_BACK-TO-BACK_ROAD_TRIPS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_NET_TRAVEL_MILES_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_PRIMETIME_GAMES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_SHORT_ROAD_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_SHORT_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_TOTAL_TRAVEL_MILES_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_TRAVEL_MILES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WEEKS_VS_OPPONENT_OFF_BYE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WEEKS_VS_OPPONENT_OFF_BYE.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WKS_WITH_LESS_REST.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PAIN_INDEX_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_NET_REST_DIFFERENCE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_NET_REST_DIFFERENCE.jpg">
            </div>
            <!-- <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_TRAVEL_DIFF.jpg">
            </div> -->
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'net'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_NET_REST_DIFFERENCE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_NET_REST_DIFFERENCE.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_NET_REST_DIFFERENCE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_NET_REST_DIFFERENCE.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'bye'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_WEEKS_VS_OPPONENT_OFF_BYE.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_WKS_WITH_LESS_REST.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WEEKS_VS_OPPONENT_OFF_BYE_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WEEKS_VS_OPPONENT_OFF_BYE.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_WKS_WITH_LESS_REST.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'pain'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PAIN_INDEX_ALL_YRS.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'weeks'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_SHORT_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_ROAD_WEEKS_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_SHORT_ROAD_WEEKS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_SHORT_ROAD_WEEKS.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'travel'">
            <!-- <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BEST_TRAVEL_DIFF.jpg">
            </div> -->
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/LEAST_TRAVEL_MILES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_NET_TRAVEL_MILES_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_TOTAL_TRAVEL_MILES_ALL_YRS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_TRAVEL_MILES.jpg">
            </div>
            <!-- <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WORST_TRAVEL_DIFF.jpg">
            </div> -->
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_BACK-TO-BACK_ROAD_TRIPS.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_BACK-TO-BACK_ROAD_TRIPS.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'prime'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/MOST_PRIMETIME_GAMES.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/FEWEST_PRIMETIME_GAMES.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'afce'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BACK-TO-BACK_ROAD_TRIPS_AFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/NET_REST_DIFFERENCE_AFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PRIMETIME_GAMES_AFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_ROAD_WEEKS_AFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_WEEKS_AFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WEEKS_VS_OPPONENT_OFF_BYE_AFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WKS_WITH_LESS_REST_AFC_East.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'afcn'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BACK-TO-BACK_ROAD_TRIPS_AFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/NET_REST_DIFFERENCE_AFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PRIMETIME_GAMES_AFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_ROAD_WEEKS_AFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_WEEKS_AFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WEEKS_VS_OPPONENT_OFF_BYE_AFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WKS_WITH_LESS_REST_AFC_North.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'afcs'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BACK-TO-BACK_ROAD_TRIPS_AFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/NET_REST_DIFFERENCE_AFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PRIMETIME_GAMES_AFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_ROAD_WEEKS_AFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_WEEKS_AFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WEEKS_VS_OPPONENT_OFF_BYE_AFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WKS_WITH_LESS_REST_AFC_South.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'afcw'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BACK-TO-BACK_ROAD_TRIPS_AFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/NET_REST_DIFFERENCE_AFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PRIMETIME_GAMES_AFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_ROAD_WEEKS_AFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_WEEKS_AFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WEEKS_VS_OPPONENT_OFF_BYE_AFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WKS_WITH_LESS_REST_AFC_West.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'nfce'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BACK-TO-BACK_ROAD_TRIPS_NFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/NET_REST_DIFFERENCE_NFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PRIMETIME_GAMES_NFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_ROAD_WEEKS_NFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_WEEKS_NFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WEEKS_VS_OPPONENT_OFF_BYE_NFC_East.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WKS_WITH_LESS_REST_NFC_East.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'nfcn'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BACK-TO-BACK_ROAD_TRIPS_NFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/NET_REST_DIFFERENCE_NFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PRIMETIME_GAMES_NFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_ROAD_WEEKS_NFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_WEEKS_NFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WEEKS_VS_OPPONENT_OFF_BYE_NFC_North.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WKS_WITH_LESS_REST_NFC_North.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'nfcs'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BACK-TO-BACK_ROAD_TRIPS_NFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/NET_REST_DIFFERENCE_NFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PRIMETIME_GAMES_NFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_ROAD_WEEKS_NFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_WEEKS_NFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WEEKS_VS_OPPONENT_OFF_BYE_NFC_South.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WKS_WITH_LESS_REST_NFC_South.jpg">
            </div>
        </div>
        <div class="flex flex-wrap justify-around items-center" v-else-if="selection == 'nfcw'">
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/BACK-TO-BACK_ROAD_TRIPS_NFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/NET_REST_DIFFERENCE_NFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px] 
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/PRIMETIME_GAMES_NFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_ROAD_WEEKS_NFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/SHORT_WEEKS_NFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WEEKS_VS_OPPONENT_OFF_BYE_NFC_West.jpg">
            </div>
            <div class="w-72 xxs:w-96 xs:w-[450px] sm:w-[600px]
                        h-96 xxs:h-[475px] xs:h-[575px] sm:h-[750px] flex justify-center items-center">
                <img src="@/assets/schedule/WKS_WITH_LESS_REST_NFC_West.jpg">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        selection: 'overall',
      }
    },
}
</script>
