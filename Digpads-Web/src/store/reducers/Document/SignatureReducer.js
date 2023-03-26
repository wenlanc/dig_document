import { instance, getCSRF } from '../../../controllers/axios';
export const SignatureReducer = (state = [], action) => {
	switch (action.type) { 
		case 'ADD_FIELD': { 
			delete action.type;
			action.id = state.length;
			state.push(action);
			return state;
			break;
		}
		case 'UPDATE_FIELD': {
			delete action.type;
			state[action.id].left = action.left;
			state[action.id].top = action.top;
			state[action.id].width = action.width;
			state[action.id].height = action.height;
			return state;
			break;
		}
		case 'APPEND_FIELD': {
			state.push(action.payload);
			return state;
			break;
		}
		case 'UPDATE_FIELD_PROPERTY' : {
			delete action.type;
			if(state[action.id])
				state[action.id].property = { ...state[action.id].property, ...action.payload };
			return state;
			break;
		}
		case 'REMOVE_FIELD': {
			state[action.id] = null;
			return state;
			break;
		}
		case 'REMOVE_ALL_FIELD': {
			return [];
			break;
		}
		case 'ADD_SIGNATURE' : {
			console.log(state[action.id]);

			let request = instance.post(`/edocument/saveSignature`,
				{ 
					 title: "my_signature",
					 fields : JSON.stringify(state[action.id])
				});	
			request.then((res) => { 
				if (res.status === 200) {
					console.log(res);
					// Go to list of documents
				}
			})
			.catch((e) => {
				console.log(e);
			});
			
			return state;
			break;
		}
		case 'SAVE_CUSTOM_FIELD' : {
			let request = instance.post(`/edocument/saveCustomField`,
				{ 
					 title: action.payload.newCustomFieldName,
					 fields : JSON.stringify(state[action.payload.id])
				});	
			request.then((res) => { 
				if (res.status === 200) {
					console.log(res);
					// Go to list of documents
				}
			})
			.catch((e) => {
				console.log(e);
			});
			
			return state;
			break;
		}
		case 'SAVE_WEB_FORM' : {
			let request = instance.post(`/edocument/saveWebForm`,
					action.payload
				);	
			request.then((res) => { 
				if (res.status === 200) {
					console.log(res);
					// Go to list of documents
				}
			})
			.catch((e) => {
				console.log(e);
			});
			
			return state;
			break;
		}
		default: {
            return state;
			break;
		}
	}
}

