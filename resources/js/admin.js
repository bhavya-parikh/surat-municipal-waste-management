import axios from 'axios'
import moment from 'moment'

export function initAdmin(){
    const certificateTableBody = document.querySelector('#certificateTableBody')
    let societyDetails = []
    let markup
    axios.get('/agents/certificate-requests', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res =>{
        societyDetails = res.data
        markup = generateMarkup(societyDetails)
        certificateTableBody.innerHTML = markup
    }).catch(err=>{
        console.log(err)
    })

    function generateMarkup(societyDetails){
        return societyDetails.map(societyDetail => {
            return `
                <tr>
                <td class="border px-4 py-2 text-green-900">${ societyDetail.SocietyName } </td>
                <td class="border px-4 py-2">${ societyDetail.SocietyAddress }</td>
                <td class="border px-4 py-2">${ societyDetail.SecretaryNo }</td>
                <td class="border px-4 py-2">${ societyDetail.WorkerName }</td>
                <td class="border px-4 py-2">${ societyDetail.WorkerNo }</td>
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-64">
                        <form action="/agents/certificate-requests/CertificateStatus" method="POST">
                            <input type="hidden" name="_id" value="${ societyDetail._id }">
                            <select name="CertificateStatus" onchange="this.form.submit()"
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="Pending"
                                    ${ societyDetails.CertificateStatus === 'Pending' ? 'selected' : '' }>
                                    Pending</option>
                                <option value="Rejected" ${ societyDetail.CertificateStatus === 'Rejected' ? 'selected' : '' }>
                                    Rejected</option>
                                <option value="Approved" ${ societyDetail.CertificateStatus === 'Approved' ? 'selected' : '' }>
                                    Approved
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
                    ${ moment(societyDetail.updatedAt).format('MMM Do YY') }
                </td>
            </tr>
        `
        }).join('')
    }
}

