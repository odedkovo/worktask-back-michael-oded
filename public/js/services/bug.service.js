export const bugService = {
  query,
  removeBug,
  addBug,
  getById,
};

function query() {
  return axios.get('/api/bug').then((res) => res.data);
}

function removeBug(bugId) {
  return axios.delete(`/api/bug/${bugId}`).then((res) => res.data);
}

async function addBug(bug) {
  if (bug._id) {
    return axios.put(`/api/bug/:${bug._id}`, bug).then((res) => res.data);
  } else return axios.post(`/api/bug`, bug).then((res) =>{
    const bugId = +res.data
    return bugId
  });
}

function getById(bugId) {
  return axios.get(`/api/bug/${bugId}`).then((res) => res.data);
}

