const userModel = require('../../../models/users');
const breedModel = require('../../../models/breeds');
const petModel = require('../../../models/pets');
const petTypeModel = require('../../../models/petTypes');
const petSizeModel = require('../../../models/petSizes');
const petColourModel = require('../../../models/petColours');

module.exports = {
    addDummyPets: async (user) => {
		const bread = new breedModel({
				title:'New Breed',
				description: 'this is a new breed',
				status:0
			});
			await bread.save();
			const type = new petTypeModel({
				title:'New Type',
				description: 'this is a new type',
				breads:[bread._id],
				status:0
			});
			await type.save();
			const size = new petSizeModel({
				title:'Medium',
				description: 'this is size',
				status:0
			});
			await size.save();
			const color = new petColourModel({
				title:'Black',
				description: '',
				status:0
			});
			await color.save();

			const pet = new petModel({
				user: '5e3264a3be478e598031e1b8',
				name: 'caspey',
				nickName: 'caspey',
				profilePhoto:'',
				profileCoverPhoto:'',
				petType:type._id,
				breed:bread._id,
				isPurebred:true,
				petSize:size._id,
				birthDate: new Date().getTime(),
				gender:'Male',
				colour:color._id,
				likes:['peanuts'],
				dislikes: ['butter'],
				favouritePlace:{
					address:'ktm',
					lat:85,
					long:27
				},
				traits: null,
				description: 'my pet',
				hasMicrochip:true,
				chipBrand:'IBM',
				chipNumber:'132-A',
				status:true,
				isLost:false,
				lostAt:null,
				foundAt:null,
				petLostAddress:null
			});
			await pet.save();
	}
} 