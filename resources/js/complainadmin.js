import axios from 'axios'
import moment from 'moment'

export function initComplainAdmin(){
    const complainTableBody = document.querySelector('#complainTableBody')
    let complainDetails = []
    let markup
    axios.get('/admin/complains', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res =>{
        complainDetails = res.data
        markup = generateMarkup(complainDetails)
        complainTableBody.innerHTML = markup
    }).catch(err=>{
        console.log(err)
    })

    function generateMarkup(complainDetails){
        return complainDetails.map(complainDetail => {
            return `
                <tr>
                <td class="border px-4 py-2 text-green-900">${ complainDetail.Name } </td>
                <td class="border px-4 py-2">${ complainDetail.Address }</td>
                <td class="border px-4 py-2">${ complainDetail.Number }</td>
                <td class="border px-4 py-2">${ complainDetail.Complain }</td>
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-64">
                        <form action="/admin/complains/ComplainStatus" method="POST">
                            <input type="hidden" name="_id" value="${ complainDetail._id }">
                            <select name="ComplainStatus" onchange="this.form.submit()"
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="Pending"
                                    ${ complainDetails.ComplainStatus === 'Pending' ? 'selected' : '' }>
                                    Pending</option>
                                <option value="Resolved" ${ complainDetail.ComplainStatus === 'Resolved' ? 'selected' : '' }>
                                    Resolved
                                </option>
                            </select>
                        </form>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </td>
                <td class="border px-4 py-2">
                    ${ moment(complainDetail.createdAt).format('MMM Do YY') }
                </td>
            </tr>
        `
        }).join('')
    }
}

