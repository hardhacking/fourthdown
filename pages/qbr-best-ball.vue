<template>
    <div class="min-h-screen bg-espngray-100">
        <h1 class="text-3xl flex w-full justify-around py-8">ESPN QBR Best Ball League</h1>
        <div class="flex w-full justify-around">
            <select class="text-2xl my-4" v-model="selectedWeek" v-on:change="reLoad">
                <option v-for="option in [1, 2, 3, 4, 5, 6]" :value="option">Week {{option}}</option>
            </select>
        </div>
        <h2 class="text-2xl flex w-full justify-around py-4">Team Standings</h2>
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="flow-root">
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th 
                                        scope="col" 
                                        class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8 cursor-pointer" 
                                        v-on:click="sortTeamsTable('team')"
                                    >
                                        Team 
                                        <span v-if="sortedBy == 'team' && sortedDir == 'd'">↓</span>
                                        <span v-else-if="sortedBy == 'team'">↑</span>
                                    </th>
                                    <th 
                                        scope="col" 
                                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer" 
                                        v-on:click="sortTeamsTable('wScore')"
                                    >
                                        Week Score 
                                        <span v-if="sortedBy == 'wScore' && sortedDir == 'd'">↓</span>
                                        <span v-else-if="sortedBy == 'wScore'">↑</span>
                                    </th>
                                    <th 
                                        scope="col" 
                                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer" 
                                        v-on:click="sortTeamsTable('sScore')"
                                    >
                                        Season Score 
                                        <span v-if="sortedBy == 'sScore' && sortedDir == 'd'">↓</span>
                                        <span v-else-if="sortedBy == 'sScore'">↑</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="team in teamData">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ team.team }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" v-if="team.wScore > 0">{{ Math.round(team.wScore * 10) / 10 }} ({{ team.wRank }})</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" v-else>{{ Math.round(team.wScore * 10) / 10 }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ Math.round(team.sScore * 10) / 10 }} ({{ team.sRank }})</td>
                                </tr>
                            </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <h2 class="text-2xl flex w-full justify-around py-4">Top Week's Scores</h2>
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="flow-root">
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Player</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Team</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Score</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Game</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Adj QBR</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action Plays</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="qbr in tableData">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ qbr.athlete.displayName }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" v-if="draft.filter(f => Number(f.id) == Number(qbr.athlete.id)).length > 0">{{ draft.filter(f => Number(f.id) == Number(qbr.athlete.id))[0].team }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" v-else>Undrafted</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ Math.round(qbr.score * 10) / 10 }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" v-if="qbr.game.homeAway == 'home'">{{ qbr.game.teamOpponent.abbreviation + ' @ ' + qbr.athlete.teamShortName }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500" v-else>{{ qbr.athlete.teamShortName + ' @ ' + qbr.game.teamOpponent.abbreviation }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ qbr.categories[0].totals[0] }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ qbr.categories[0].totals[2] }}</td>
                                </tr>
                                <tr class="cursor-pointer">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 font-medium sm:pl-6 lg:pl-8 text-base text-blue-500" v-if="tableData && QBRs.length > tableData.length" v-on:click="getMore">See More</td>
                                    <td v-else></td>
                                    <td class="whitespace-nowrap py-4 px-3 font-medium text-base text-blue-500" v-if="tableData && tableData.length > 10" v-on:click="getLess">See Less</td>
                                    <td v-else></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex w-full justify-around">
            <select class="text-2xl my-4" v-model="selectedTeam">
                <option v-for="option in teamData.map(d => d.team)" :value="option">{{option}}</option>
            </select>
        </div>
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="flow-root">
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Player</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Score</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Adj QBR</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action Plays</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="qbr in eachTeamTable.filter(f => f.team == selectedTeam)">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ qbr.name }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ Math.round(qbr.wScore * 10) / 10 }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ qbr.qbr }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ qbr.plays }}</td>
                                </tr>
                            </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useGameStore } from '../stores/QBRStore'
    import * as d3 from 'd3'

    const draft = [
        {"rd":1,"pick":1,"player":"Will Howard","id":4429955,"team":"Andre","cfb_team_id":194},
        {"rd":1,"pick":2,"player":"Jaxson Dart","id":4689114,"team":"Lauren","cfb_team_id":145},{"rd":1,"pick":3,"player":"Dillon Gabriel","id":4427238,"team":"Sharon","cfb_team_id":2483},{"rd":1,"pick":4,"player":"Noah Fifita","id":4801717,"team":"Matt","cfb_team_id":12},{"rd":1,"pick":5,"player":"Carson Beck","id":4430841,"team":"Chris","cfb_team_id":61},{"rd":1,"pick":6,"player":"Jalen Milroe","id":4432734,"team":"Mitchell","cfb_team_id":333},{"rd":1,"pick":7,"player":"Jalon Daniels","id":4596472,"team":"Nitz","cfb_team_id":2305},{"rd":1,"pick":8,"player":"Shedeur Sanders","id":4432762,"team":"Jeff","cfb_team_id":38},{"rd":1,"pick":9,"player":"Jackson Arnold","id":4870607,"team":"Brett","cfb_team_id":201},{"rd":1,"pick":10,"player":"Cam Rising","id":4362075,"team":"Seth","cfb_team_id":254},{"rd":1,"pick":11,"player":"Miller Moss","id":4431580,"team":"Dean","cfb_team_id":30},{"rd":2,"pick":12,"player":"DJ Uiagalelei","id":4429020,"team":"Dean","cfb_team_id":52},{"rd":2,"pick":13,"player":"Kaidon Salter","id":4432803,"team":"Seth","cfb_team_id":2335},{"rd":2,"pick":14,"player":"Byrum Brown","id":4880272,"team":"Brett","cfb_team_id":58},{"rd":2,"pick":15,"player":"Brady Cook","id":4429435,"team":"Jeff","cfb_team_id":142},{"rd":2,"pick":16,"player":"Cam Ward","id":4688380,"team":"Nitz","cfb_team_id":2390},{"rd":2,"pick":17,"player":"Nico Iamaleava","id":4870799,"team":"Mitchell","cfb_team_id":2633},{"rd":2,"pick":18,"player":"Quinn Ewers","id":4889929,"team":"Chris","cfb_team_id":251},{"rd":2,"pick":19,"player":"Seth Henigan","id":4606194,"team":"Matt","cfb_team_id":235},{"rd":2,"pick":20,"player":"Avery Johnson","id":4870857,"team":"Sharon","cfb_team_id":2306},{"rd":2,"pick":21,"player":"Kyle McCord","id":4433971,"team":"Lauren","cfb_team_id":183},{"rd":2,"pick":22,"player":"Riley Leonard","id":4683423,"team":"Andre","cfb_team_id":87},{"rd":3,"pick":23,"player":"Drew Allar","id":4714771,"team":"Andre","cfb_team_id":213},{"rd":3,"pick":24,"player":"Garrett Greene","id":4429847,"team":"Lauren","cfb_team_id":277},{"rd":3,"pick":25,"player":"Garrett Nussmeier","id":4567747,"team":"Sharon","cfb_team_id":99},{"rd":3,"pick":26,"player":"Josh Hoover","id":4685401,"team":"Matt","cfb_team_id":2628},{"rd":3,"pick":27,"player":"Cade Klubnik","id":4685413,"team":"Chris","cfb_team_id":228},{"rd":3,"pick":28,"player":"Conner Weigman","id":4685574,"team":"Mitchell","cfb_team_id":245},{"rd":3,"pick":29,"player":"Alan Bowman","id":4362159,"team":"Nitz","cfb_team_id":197},{"rd":3,"pick":30,"player":"Brayden Schager","id":4709977,"team":"Jeff","cfb_team_id":62},{"rd":3,"pick":31,"player":"KJ Jefferson","id":4567149,"team":"Brett","cfb_team_id":2116},{"rd":3,"pick":32,"player":"Haynes King","id":4428993,"team":"Seth","cfb_team_id":59},{"rd":3,"pick":33,"player":"Kyron Drones","id":4678010,"team":"Dean","cfb_team_id":259},{"rd":4,"pick":34,"player":"Dylan Raiola","id":5079572,"team":"Dean","cfb_team_id":158},{"rd":4,"pick":35,"player":"Preston Stone","id":4432767,"team":"Seth","cfb_team_id":2567},{"rd":4,"pick":36,"player":"Jordan McCloud","id":4360890,"team":"Brett","cfb_team_id":326},{"rd":4,"pick":37,"player":"Dequan Finn","id":4427191,"team":"Jeff","cfb_team_id":239},{"rd":4,"pick":38,"player":"Grayson McCall","id":4427936,"team":"Nitz","cfb_team_id":152},{"rd":4,"pick":39,"player":"Thomas Castellanos","id":4773919,"team":"Mitchell","cfb_team_id":103},{"rd":4,"pick":40,"player":"Rocco Becht","id":4801299,"team":"Chris","cfb_team_id":66},{"rd":4,"pick":41,"player":"Tyler Shough","id":4360689,"team":"Matt","cfb_team_id":97},{"rd":4,"pick":42,"player":"Taylen Green","id":4431325,"team":"Sharon","cfb_team_id":8},{"rd":4,"pick":43,"player":"Donovan Smith","id":4690977,"team":"Lauren","cfb_team_id":248},{"rd":4,"pick":44,"player":"Devon Dampier","id":5105849,"team":"Andre","cfb_team_id":167},{"rd":5,"pick":45,"player":"Chandler Morris","id":4692530,"team":"Andre","cfb_team_id":249},{"rd":5,"pick":46,"player":"Kurtis Rourke","id":4430431,"team":"Lauren","cfb_team_id":84},{"rd":5,"pick":47,"player":"Tyler Van Dyke","id":4685186,"team":"Sharon","cfb_team_id":275},{"rd":5,"pick":48,"player":"TJ Finley","id":4431948,"team":"Matt","cfb_team_id":98},{"rd":5,"pick":49,"player":"Graham Mertz","id":4426335,"team":"Chris","cfb_team_id":57},{"rd":5,"pick":50,"player":"Anthony Colandrea","id":5044387,"team":"Mitchell","cfb_team_id":258},{"rd":5,"pick":51,"player":"Payton Thorne","id":4430590,"team":"Nitz","cfb_team_id":2},{"rd":5,"pick":52,"player":"Zeon Chriss","id":4870518,"team":"Jeff","cfb_team_id":248},{"rd":5,"pick":53,"player":"LaNorris Sellers","id":4875127,"team":"Brett","cfb_team_id":2579},{"rd":5,"pick":54,"player":"Joey Aguilar","id":5151948,"team":"Seth","cfb_team_id":2026},{"rd":5,"pick":55,"player":"Mikey Keene","id":4597499,"team":"Dean","cfb_team_id":278},{"rd":6,"pick":56,"player":"Hudson Card","id":4429032,"team":"Dean","cfb_team_id":2509},{"rd":6,"pick":57,"player":"Brett Gabbert","id":4427243,"team":"Seth","cfb_team_id":193},{"rd":6,"pick":58,"player":"Will Rogers","id":102597,"team":"Brett","cfb_team_id":264},{"rd":6,"pick":59,"player":"Chandler Rogers","id":4570554,"team":"Jeff","cfb_team_id":25},{"rd":6,"pick":60,"player":"Ethan Garbers","id":4429068,"team":"Nitz","cfb_team_id":26},{"rd":6,"pick":61,"player":"Max Johnson","id":4685740,"team":"Mitchell","cfb_team_id":153},{"rd":6,"pick":62,"player":"Maddux Madsen","id":4870513,"team":"Chris","cfb_team_id":68},{"rd":6,"pick":63,"player":"Diego Pavia","id":5084180,"team":"Matt","cfb_team_id":238},{"rd":6,"pick":64,"player":"Jacob Zeno","id":4426417,"team":"Sharon","cfb_team_id":5},{"rd":6,"pick":65,"player":"Brock Vandagriff","id":4432782,"team":"Lauren","cfb_team_id":96},{"rd":6,"pick":66,"player":"Ben Finley","id":4431091,"team":"Andre","cfb_team_id":2006},{"rd":7,"pick":67,"player":"Behren Morton","id":4431465,"team":"Andre","cfb_team_id":2641},{"rd":7,"pick":68,"player":"Sam Leavitt","id":5078810,"team":"Lauren","cfb_team_id":9},{"rd":7,"pick":69,"player":"Ryan Hilinski","id":4426657,"team":"Sharon","cfb_team_id":77},{"rd":7,"pick":70,"player":"Evan Svoboda","id":5082633,"team":"Matt","cfb_team_id":2751},{"rd":7,"pick":71,"player":"Jaylen Raynor","id":5080403,"team":"Chris","cfb_team_id":2032},{"rd":7,"pick":72,"player":"Alex Orji","id":4685495,"team":"Mitchell","cfb_team_id":130},{"rd":7,"pick":73,"player":"Arch Manning","id":4870906,"team":"Nitz","cfb_team_id":251},{"rd":7,"pick":74,"player":"John Mateer","id":4915980,"team":"Jeff","cfb_team_id":265},{"rd":7,"pick":75,"player":"Nicholas Vattiato","id":4682518,"team":"Brett","cfb_team_id":2393},{"rd":7,"pick":76,"player":"Matthew Sluka","id":4695904,"team":"Seth","cfb_team_id":2439},
        {"rd":7,"pick":77,"player":"DJ Lagway","id":5079555,"team":"Dean","cfb_team_id":57}
    ] 

    const selectedTeam = ref('Andre')
    const selectedWeek = ref(6)
    const sortedBy = ref('wScore')
    const sortedDir = ref('d')

    const store = useGameStore()
    const weeksTable = ref([])
    // const scoreBoard = ref([])
    // const events = ref(null)
    const QBRs = ref(null)
    const tableData = ref(null)
    // const QBRsToAdd = ref([])
    const counter = ref(0)
    const teamData = ref([])
    const eachTeamTable = ref([])
    const teamData1 = ref([])
    const teamData2 = ref([])
    const teamData3 = ref([])
    const teamData4 = ref([])
    const teamData5 = ref([])
    const teamData6 = ref([])
    // const gameBox = ref(null)
    onMounted(async () => {
        weeksTable.value = await store.weeksTable6
        let weeksTable1 = await store.weeksTable1
        let weeksTable2 = await store.weeksTable2
        let weeksTable3 = await store.weeksTable3
        let weeksTable4 = await store.weeksTable4
        let weeksTable5 = await store.weeksTable5
                                
        QBRs.value = weeksTable.value.athletes ? weeksTable.value.athletes : []
        let QBRs1 = weeksTable1.athletes ? weeksTable1.athletes : []
        let QBRs2 = weeksTable2.athletes ? weeksTable2.athletes : []
        let QBRs3 = weeksTable3.athletes ? weeksTable3.athletes : []
        let QBRs4 = weeksTable4.athletes ? weeksTable4.athletes : []
        let QBRs5 = weeksTable5.athletes ? weeksTable5.athletes : []

        QBRs.value = QBRs.value.map(d => {
            d.score = d.categories[0].totals[2] <= 35 ? d.categories[0].totals[0] * (d.categories[0].totals[2] / 35) : d.categories[0].totals[0] * Math.pow((d.categories[0].totals[2] / 35), 1/4)
            d.scoreToUse = d.score
            return d
        }).sort((a, b) => d3.descending(a.score, b.score))
        QBRs1.map(d => {
            d.score = d.categories[0].totals[2] <= 35 ? d.categories[0].totals[0] * (d.categories[0].totals[2] / 35) : d.categories[0].totals[0] * Math.pow((d.categories[0].totals[2] / 35), 1/4)
            return d
        })
        QBRs1 = QBRs1.map(d => {
            if ([4429020, 4428993, 4709977, 5105849, 4432767].includes(Number(d.athlete.id))) {
                d.scoreToUse = QBRs1.filter(f => f.athlete.id == d.athlete.id).reduce((acc, obj) => acc + obj.score, 0) / 2
            } else {
                d.scoreToUse = d.score
            }
            return d
        }).sort((a, b) => d3.descending(a.score, b.score))
        QBRs2 = QBRs2.map(d => {
            d.score = d.categories[0].totals[2] <= 35 ? d.categories[0].totals[0] * (d.categories[0].totals[2] / 35) : d.categories[0].totals[0] * Math.pow((d.categories[0].totals[2] / 35), 1/4)
            d.scoreToUse = d.score
            return d
        }).sort((a, b) => d3.descending(a.score, b.score))
        QBRs3 = QBRs3.map(d => {
            d.score = d.categories[0].totals[2] <= 35 ? d.categories[0].totals[0] * (d.categories[0].totals[2] / 35) : d.categories[0].totals[0] * Math.pow((d.categories[0].totals[2] / 35), 1/4)
            d.scoreToUse = d.score
            return d
        }).sort((a, b) => d3.descending(a.score, b.score))
        QBRs4 = QBRs4.map(d => {
            d.score = d.categories[0].totals[2] <= 35 ? d.categories[0].totals[0] * (d.categories[0].totals[2] / 35) : d.categories[0].totals[0] * Math.pow((d.categories[0].totals[2] / 35), 1/4)
            d.scoreToUse = d.score
            return d
        }).sort((a, b) => d3.descending(a.score, b.score))
        QBRs5 = QBRs5.map(d => {
            d.score = d.categories[0].totals[2] <= 35 ? d.categories[0].totals[0] * (d.categories[0].totals[2] / 35) : d.categories[0].totals[0] * Math.pow((d.categories[0].totals[2] / 35), 1/4)
            d.scoreToUse = d.score
            return d
        }).sort((a, b) => d3.descending(a.score, b.score))
        
        tableData.value = QBRs.value.slice(0, counter.value * 10 + 10)

        teamData.value = draft.map(({team}) => ({team})).slice(0, 11)
        teamData.value.map(d => {
            if (QBRs.value.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).length > 0) {
                d.wScore = QBRs.value.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).slice(0, 3).reduce((acc, obj) => acc + obj.scoreToUse, 0)
            } else {
                d.wScore = 0
            }
            
            d.sScore = d.wScore
            return d
        })

        teamData6.value = draft.map(({team}) => ({team})).slice(0, 11)
        teamData6.value.map(d => {
            if (QBRs.value.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).length > 0) {
                d.wScore = QBRs.value.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).slice(0, 3).reduce((acc, obj) => acc + obj.scoreToUse, 0)
            } else {
                d.wScore = 0
            }
            
            d.sScore = d.wScore
            return d
        })
        teamData1.value = draft.map(({team}) => ({team})).slice(0, 11)
        teamData1.value.map(d => {
            if (QBRs1.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).length > 0) {
                d.wScore = QBRs1.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).slice(0, 3).reduce((acc, obj) => acc + obj.scoreToUse, 0)
            } else {
                d.wScore = 0
            }
            
            d.sScore = d.wScore
            return d
        })
        teamData2.value = draft.map(({team}) => ({team})).slice(0, 11)
        teamData2.value.map(d => {
            if (QBRs2.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).length > 0) {
                d.wScore = QBRs2.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).slice(0, 3).reduce((acc, obj) => acc + obj.scoreToUse, 0)
            } else {
                d.wScore = 0
            }
            
            d.sScore = d.wScore
            return d
        })
        teamData3.value = draft.map(({team}) => ({team})).slice(0, 11)
        teamData3.value.map(d => {
            if (QBRs3.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).length > 0) {
                d.wScore = QBRs3.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).slice(0, 3).reduce((acc, obj) => acc + obj.scoreToUse, 0)
            } else {
                d.wScore = 0
            }
            
            d.sScore = d.wScore
            return d
        })
        teamData4.value = draft.map(({team}) => ({team})).slice(0, 11)
        teamData4.value.map(d => {
            if (QBRs4.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).length > 0) {
                d.wScore = QBRs4.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).slice(0, 3).reduce((acc, obj) => acc + obj.scoreToUse, 0)
            } else {
                d.wScore = 0
            }
            
            d.sScore = d.wScore
            return d
        })
        teamData5.value = draft.map(({team}) => ({team})).slice(0, 11)
        teamData5.value.map(d => {
            if (QBRs5.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).length > 0) {
                d.wScore = QBRs5.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).slice(0, 3).reduce((acc, obj) => acc + obj.scoreToUse, 0)
            } else {
                d.wScore = 0
            }
            
            d.sScore = d.wScore
            return d
        })

        teamData.value = teamData.value.sort((a, b) => d3.descending(a.wScore, b.wScore))
        teamData.value.map((d, i) => {
            d.sScore = teamData1.value.filter(f => f.team == d.team)[0].sScore + teamData2.value.filter(f => f.team == d.team)[0].sScore + 
                       teamData3.value.filter(f => f.team == d.team)[0].sScore + teamData4.value.filter(f => f.team == d.team)[0].sScore + 
                       teamData5.value.filter(f => f.team == d.team)[0].sScore + teamData6.value.filter(f => f.team == d.team)[0].sScore
            d.wRank = i + 1
            return d
        })
        teamData.value = teamData.value.sort((a, b) => d3.descending(a.sScore, b.sScore))
        teamData.value.map((d, i) => {
            d.sRank = i + 1
            return d
        })
        teamData.value = teamData.value.sort((a, b) => d3.descending(a.wScore, b.wScore))

        eachTeamTable.value = draft.map(({team, player, id}) => ({team, player, id}))

        eachTeamTable.value = eachTeamTable.value.map(d => {
            if (QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                }).length > 0) {
                d.wScore = QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                })[0].scoreToUse
                d.name = QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                })[0].athlete.displayName
                d.qbr = QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                })[0].categories[0].totals[0]
                d.plays = QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                })[0].categories[0].totals[2]
            } else {
                d.wScore = 0
                d.name = d.player
                d.qbr = 0
                d.plays = 0
            }
            return d
        })
        eachTeamTable.value = eachTeamTable.value.sort((a, b) => d3.descending(a.wScore, b.wScore))
    })

    function getMore() {
        counter.value = counter.value + 1
        tableData.value = QBRs.value.slice(0, counter.value * 10 + 10)
    }

    function getLess() {
        counter.value = counter.value - 1
        tableData.value = QBRs.value.slice(0, counter.value * 10 + 10)
    }

    function sortTeamsTable(v) {
        if (v == sortedBy.value) {
            if (sortedDir.value == 'a') {
                teamData.value = teamData.value.sort((a, b) => d3.descending(a[v], b[v]))
                sortedDir.value = 'd'
            } else {
                teamData.value = teamData.value.sort((a, b) => d3.ascending(a[v], b[v]))
                sortedDir.value = 'a'
            }
        } else {
            teamData.value = teamData.value.sort((a, b) => d3.descending(a[v], b[v]))
            sortedDir.value = 'd'
        }
        sortedBy.value = v
    }

    async function reLoad() {
        store.value = useGameStore()
        weeksTable.value = []
        // scoreBoard.value = []
        // events.value = null
        QBRs.value = null
        tableData.value = null
        // QBRsToAdd.value = []
        eachTeamTable.value = []
        // gameBox.value = null
        counter.value = 0
        weeksTable.value = selectedWeek.value == 1 ? await store.weeksTable1 : 
                                (selectedWeek.value == 2 ? await store.weeksTable2 : 
                                (selectedWeek.value == 3 ? await store.weeksTable3 : 
                                (selectedWeek.value == 4 ? await store.weeksTable4 : 
                                (selectedWeek.value == 5 ? await store.weeksTable5 : 
                                (selectedWeek.value == 6 ? await store.weeksTable6 : [])))))
        QBRs.value = weeksTable.value.athletes ? weeksTable.value.athletes : []

        QBRs.value = QBRs.value.map(d => {
            d.score = d.categories[0].totals[2] <= 35 ? d.categories[0].totals[0] * (d.categories[0].totals[2] / 35) : d.categories[0].totals[0] * Math.pow((d.categories[0].totals[2] / 35), 1/4)
            if (selectedWeek.value == 1 && [4429020, 4428993, 4709977, 5105849, 4432767].includes(Number(d.athlete.id))) {
                d.scoreToUse = QBRs.value.filter(f => f.athlete.id == d.athlete.id).reduce((acc, obj) => acc + obj.score, 0) / 2
            } else {
                d.scoreToUse = d.score
            }
            return d
        }).sort((a, b) => d3.descending(a.score, b.score))
        
        tableData.value = QBRs.value.slice(0, counter.value * 10 + 10)

        teamData.value.map(d => {
            if (QBRs.value.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).length > 0) {
                d.wScore = QBRs.value.filter(f => {
                    return draft.filter(ff => ff.team == d.team).map(dd => dd.id).includes(Number(f.athlete.id))
                }).slice(0, 3).reduce((acc, obj) => acc + obj.scoreToUse, 0)
            } else {
                d.wScore = 0
            }
            return d
        })

        teamData.value.map(d => {
            d.sScore = (selectedWeek.value >= 1 ? teamData1.value.filter(f => f.team == d.team)[0].sScore : 0) + (selectedWeek.value >= 2 ? teamData2.value.filter(f => f.team == d.team)[0].sScore : 0) + 
                       (selectedWeek.value >= 3 ? teamData3.value.filter(f => f.team == d.team)[0].sScore : 0) + (selectedWeek.value >= 4 ? teamData4.value.filter(f => f.team == d.team)[0].sScore : 0) + 
                       (selectedWeek.value >= 5 ? teamData5.value.filter(f => f.team == d.team)[0].sScore : 0) + (selectedWeek.value >= 6 ? teamData6.value.filter(f => f.team == d.team)[0].sScore : 0)
            return d
        })
        teamData.value = teamData.value.sort((a, b) => d3.descending(a.sScore, b.sScore))
        teamData.value.map((d, i) => {
            d.sRank = i + 1
            return d
        })
        teamData.value = teamData.value.sort((a, b) => d3.descending(a.wScore, b.wScore))
        teamData.value.map((d, i) => {
            d.wRank = i + 1
            return d
        })

        eachTeamTable.value = draft.map(({team, player, id}) => ({team, player, id}))

        eachTeamTable.value = eachTeamTable.value.map(d => {
            if (QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                }).length > 0) {
                d.wScore = QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                })[0].scoreToUse
                d.name = QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                })[0].athlete.displayName
                d.qbr = QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                })[0].categories[0].totals[0]
                d.plays = QBRs.value.filter(f => {
                    return Number(f.athlete.id) == Number(d.id)
                })[0].categories[0].totals[2]
            } else {
                d.wScore = 0
                d.name = d.player
                d.qbr = 0
                d.plays = 0
            }
            return d
        })
        eachTeamTable.value = eachTeamTable.value.sort((a, b) => d3.descending(a.wScore, b.wScore))
    }

    
</script>