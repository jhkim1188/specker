import { SubmissionError } from 'redux-form'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

function submit(values, f,o) {

    return sleep(1000) // simulate server latency
        .then(() => {
            if (![ 'chdaos123@naver.com', 'paul', 'george', 'ringo' ].includes(values.email)) {
                throw new SubmissionError({ email: 'User does not exist', _error: 'Login failed!' })
            } else if (values.password !== 'redux-form') {
                throw new SubmissionError({ password: 'Wrong password', _error: 'Login failed!' })
            } else {
                o.onSubmit();
            }
        })
}
export default submit;