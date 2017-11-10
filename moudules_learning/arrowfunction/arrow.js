var materials = [
    'Hydrogen',
    'Helium',
    'Lithium',
    'Beryllium'
];
materials.map((material) => {
        return material.length;
    }) //[8,6,7,9]
console.log(materials.map(material => material.length)); //[8,6,7,9]