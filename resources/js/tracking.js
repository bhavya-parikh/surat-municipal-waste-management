import axios from 'axios'
import moment from 'moment'

export function initCertificate(){
    const certificateTableBody = document.querySelector('#certificateTableBody')
    let societyDetails = []
    let markup
    axios.get('/tracking', {
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
                <td class="border px-4 py-2 text-green-900">${ societyDetails.CertificateStatus } </td>
                <td class="border px-4 py-2">
                    ${ moment(societyDetail.updatedAt).format('MMM Do YY') }
                </td>
            </tr>
        `
        }).join('')
    }
}

