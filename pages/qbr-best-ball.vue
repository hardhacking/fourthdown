<template>
    <div class="min-h-screen bg-espngray-100">
        <h1 class="text-3xl flex w-full justify-around py-8">ESPN QBR Best Ball League</h1>

        <h2 class="text-2xl flex w-full justify-around py-4">Team Standings</h2>
        <div class="px-4 sm:px-6 lg:px-8">
            <div class="flow-root">
                <div class="overflow-x-auto">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                            <table class="min-w-full divide-y divide-gray-300">
                            <thead>
                                <tr>
                                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8">Team</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Week Score</th>
                                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Season Score</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                                <tr v-for="team in teamData">
                                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">{{ team.team }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ Math.round(team.wScore * 10) / 10 }}</td>
                                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ team.sScore }}</td>
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
        {"rd":1,"pick":1,"player":"Will Howard","id":4429955,"team":"Andre"},
        {"rd":1,"pick":2,"player":"Jaxson Dart","id":4689114,"team":"Lauren"},{"rd":1,"pick":3,"player":"Dillon Gabriel","id":4427238,"team":"Sharon"},{"rd":1,"pick":4,"player":"Noah Fifita","id":4801717,"team":"Matt"},{"rd":1,"pick":5,"player":"Carson Beck","id":4430841,"team":"Chris"},{"rd":1,"pick":6,"player":"Jalen Milroe","id":4432734,"team":"Mitchell"},{"rd":1,"pick":7,"player":"Jalon Daniels","id":4596472,"team":"Nitz"},{"rd":1,"pick":8,"player":"Shedeur Sanders","id":4432762,"team":"Jeff"},{"rd":1,"pick":9,"player":"Jackson Arnold","id":4870607,"team":"Brett"},{"rd":1,"pick":10,"player":"Cameron Rising","id":4362075,"team":"Seth"},{"rd":1,"pick":11,"player":"Miller Moss","id":4431580,"team":"Dean"},{"rd":2,"pick":12,"player":"DJ Uiagalelei","id":4429020,"team":"Dean"},{"rd":2,"pick":13,"player":"Kaidon Salter","id":4432803,"team":"Seth"},{"rd":2,"pick":14,"player":"Byrum Brown","id":4880272,"team":"Brett"},{"rd":2,"pick":15,"player":"Brady Cook","id":4429435,"team":"Jeff"},{"rd":2,"pick":16,"player":"Cam Ward","id":4688380,"team":"Nitz"},{"rd":2,"pick":17,"player":"Nico Iamaleava","id":4870799,"team":"Mitchell"},{"rd":2,"pick":18,"player":"Quinn Ewers","id":4889929,"team":"Chris"},{"rd":2,"pick":19,"player":"Seth Henigan","id":4606194,"team":"Matt"},{"rd":2,"pick":20,"player":"Avery Johnson","id":4870857,"team":"Sharon"},{"rd":2,"pick":21,"player":"Kyle McCord","id":4433971,"team":"Lauren"},{"rd":2,"pick":22,"player":"Riley Leonard","id":4683423,"team":"Andre"},{"rd":3,"pick":23,"player":"Drew Allar","id":4714771,"team":"Andre"},{"rd":3,"pick":24,"player":"Garrett Greene","id":4429847,"team":"Lauren"},{"rd":3,"pick":25,"player":"Garrett Nussmeier","id":4567747,"team":"Sharon"},{"rd":3,"pick":26,"player":"Josh Hoover","id":4685401,"team":"Matt"},{"rd":3,"pick":27,"player":"Cade Klubnik","id":4685413,"team":"Chris"},{"rd":3,"pick":28,"player":"Conner Weigman","id":4685574,"team":"Mitchell"},{"rd":3,"pick":29,"player":"Alan Bowman","id":4362159,"team":"Nitz"},{"rd":3,"pick":30,"player":"Brayden Schager","id":4709977,"team":"Jeff"},{"rd":3,"pick":31,"player":"KJ Jefferson","id":4567149,"team":"Brett"},{"rd":3,"pick":32,"player":"Haynes King","id":4428993,"team":"Seth"},{"rd":3,"pick":33,"player":"Kyron Drones","id":4678010,"team":"Dean"},{"rd":4,"pick":34,"player":"Dylan Raiola","id":5079572,"team":"Dean"},{"rd":4,"pick":35,"player":"Preston Stone","id":4432767,"team":"Seth"},{"rd":4,"pick":36,"player":"Jordan McCloud","id":4360890,"team":"Brett"},{"rd":4,"pick":37,"player":"Dequan Finn","id":4427191,"team":"Jeff"},{"rd":4,"pick":38,"player":"Grayson McCall","id":4427936,"team":"Nitz"},{"rd":4,"pick":39,"player":"Thomas Castellanos","id":4773919,"team":"Mitchell"},{"rd":4,"pick":40,"player":"Rocco Becht","id":4801299,"team":"Chris"},{"rd":4,"pick":41,"player":"Tyler Shough","id":4360689,"team":"Matt"},{"rd":4,"pick":42,"player":"Taylen Green","id":4431325,"team":"Sharon"},{"rd":4,"pick":43,"player":"Donovan Smith","id":4690977,"team":"Lauren"},{"rd":4,"pick":44,"player":"Devon Dampier","id":5105849,"team":"Andre"},{"rd":5,"pick":45,"player":"Chandler Morris","id":4692530,"team":"Andre"},{"rd":5,"pick":46,"player":"Kurtis Rourke","id":4430431,"team":"Lauren"},{"rd":5,"pick":47,"player":"Tyler Van Dyke","id":4685186,"team":"Sharon"},{"rd":5,"pick":48,"player":"TJ Finley","id":4431948,"team":"Matt"},{"rd":5,"pick":49,"player":"Graham Mertz","id":4426335,"team":"Chris"},{"rd":5,"pick":50,"player":"Anthony Colandrea","id":5044387,"team":"Mitchell"},{"rd":5,"pick":51,"player":"Payton Thorne","id":4430590,"team":"Nitz"},{"rd":5,"pick":52,"player":"Zeon Chriss","id":4870518,"team":"Jeff"},{"rd":5,"pick":53,"player":"LaNorris Sellers","id":4875127,"team":"Brett"},{"rd":5,"pick":54,"player":"Joey Aguilar","id":5151948,"team":"Seth"},{"rd":5,"pick":55,"player":"Mikey Keene","id":4597499,"team":"Dean"},{"rd":6,"pick":56,"player":"Hudson Card","id":4429032,"team":"Dean"},{"rd":6,"pick":57,"player":"Brett Gabbert","id":4427243,"team":"Seth"},{"rd":6,"pick":58,"player":"Will Rogers","id":102597,"team":"Brett"},{"rd":6,"pick":59,"player":"Chandler Rogers","id":4570554,"team":"Jeff"},{"rd":6,"pick":60,"player":"Ethan Garbers","id":4429068,"team":"Nitz"},{"rd":6,"pick":61,"player":"Max Johnson","id":4685740,"team":"Mitchell"},{"rd":6,"pick":62,"player":"Maddux Madsen","id":4870513,"team":"Chris"},{"rd":6,"pick":63,"player":"Diego Pavia","id":5084180,"team":"Matt"},{"rd":6,"pick":64,"player":"Jacob Zeno","id":4426417,"team":"Sharon"},{"rd":6,"pick":65,"player":"Brock Vandagriff","id":4432782,"team":"Lauren"},{"rd":6,"pick":66,"player":"Ben Finley","id":4431091,"team":"Andre"},{"rd":7,"pick":67,"player":"Behren Morton","id":4431465,"team":"Andre"},{"rd":7,"pick":68,"player":"Sam Leavitt","id":5078810,"team":"Lauren"},{"rd":7,"pick":69,"player":"Ryan Hilinski","id":4426657,"team":"Sharon"},{"rd":7,"pick":70,"player":"Evan Svoboda","id":5082633,"team":"Matt"},{"rd":7,"pick":71,"player":"Jaylen Raynor","id":5080403,"team":"Chris"},{"rd":7,"pick":72,"player":"Alex Orji","id":4685495,"team":"Mitchell"},{"rd":7,"pick":73,"player":"Arch Manning","id":4870906,"team":"Nitz"},{"rd":7,"pick":74,"player":"John Mateer","id":4915980,"team":"Jeff"},{"rd":7,"pick":75,"player":"Nicholas Vattiato","id":4682518,"team":"Brett"},{"rd":7,"pick":76,"player":"Matthew Sluka","id":4695904,"team":"Seth"},
        {"rd":7,"pick":77,"player":"DJ Lagway","id":5079555,"team":"Dean"}
    ] 

    const selectedTeam = ref('Andre')

    const store = useGameStore()
    const weeksTable = ref([])
    const QBRs = ref(null)
    const tableData = ref(null)
    const counter = ref(0)
    const teamData = ref([])
    const eachTeamTable = ref([])
    onMounted(async () => {
        weeksTable.value = await store.weeksTable
        QBRs.value = weeksTable.value.athletes.map(d => {
            d.score = d.categories[0].totals[2] <= 35 ? d.categories[0].totals[0] * (d.categories[0].totals[2] / 35) : d.categories[0].totals[0] * Math.pow((d.categories[0].totals[2] / 35), 1/4)
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
                }).slice(0, 3).reduce((acc, obj) => acc + obj.score, 0)
            } else {
                d.wScore = 0
            }
            
            d.sScore = 0
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
                })[0].score
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

    
</script>