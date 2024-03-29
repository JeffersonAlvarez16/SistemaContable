class FUNTIONS {

    filterObjectsCategories = (array, categoria) => {
        return array.filter((item)=>item.categoria===categoria)
    }

    filterObjectsTipos = (array, tipo) => {
        return array.filter((item)=>item.tipo===tipo)
    }

    filterObjectsCodigo = (array, codigo) => {
        var arrayReturn = []
        
        array.forEach(item => {
            var itemData=JSON.stringify(item);
            itemData=itemData.toLowerCase()
            var itemFilter=itemData.includes(codigo)
            if (itemFilter) {
                arrayReturn.push(item)
            }
        })
        return arrayReturn
    }
    filterObjectsCedulas = (array, cedula) => {
        var arrayReturn = []
        
        array.forEach(item => {
            var itemData=JSON.stringify(item);
            itemData=itemData.toLowerCase()
            var itemFilter=itemData.includes(cedula)
            if (itemFilter) {
                arrayReturn.push(item)
            }
        })
        return arrayReturn
    }

    filterObjectsCedula = (array, cedula) => {
        var arrayReturn = []
        array.forEach(item => {
            if (item.cedula.toString().includes(cedula)) {
                arrayReturn.push(item)
            }
        })
        return arrayReturn
    }

    categorieToKey = (array) => {
        var returnArray = []
        var contador = 0;
        array.forEach(item => {
            var itemNew = {}
            itemNew.nombre = item
            itemNew.key = contador
            returnArray.push(itemNew)
            contador++
        })
        return returnArray
    }

    repeatTo = (array) => {
        var returnArray = [];
        array.forEach(item => {
            if (!returnArray.includes(item)) {
                returnArray.push(item)
            }
        })
        return returnArray
    }

    inventarioToCategories = (snapshot) => {
        var returnArr = [];
        snapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            var nameCategory = item.categoria ? item.categoria : 'Sin Categoria';
            returnArr.push(nameCategory);
        });
        return returnArr;
    };

    contactosToCedulas = (snapshot) => {
        var returnArr = [];
        snapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            var nameCedula = item.cedula ? item.cedula : 'Sin Tipo';
            returnArr.push(nameCedula);
        });
        return returnArr;
    };

    contactosToTipos = (snapshot) => {
        var returnArr = [];
        snapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            var name = item.tipo ? item.tipo : 'Sin Tipo';
            returnArr.push(name);
        });
        return returnArr;
    };

    inventarioToProveedores = (snapshot) => {
        var returnArr = [];
        snapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            var name = item.proveedor ? item.proveedor : 'Sin Categoria';
            returnArr.push(name);
        });
        return returnArr;
    };

    guidGenerator = () => {
        var S4 = () => {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return ( S4() + S4() + S4());
    }

    setTime = (secons, funt) => {
        setTimeout(() => {
            funt()
        }, secons);
    }

    snapshotToArray = (snapshot) => {
        var array = []
        snapshot.forEach((childSnapshot) => {
            var item = childSnapshot.val();
            item.id = childSnapshot.key;
            array.push(item)
        });
        return array
    };

    obtenerFechaActual=()=>{
        var date= new Date()
        var day= date.getDate()
        var mon= date.getMonth()
        var yea= date.getFullYear()
        if(String(day).length===1){
            day='0'+day
        }
        if(String(mon).length===1){
            mon='0'+mon
        }
        return `${yea}-${mon}-${day}`
    }


}

export default new FUNTIONS()