/*
    Талхин Марсель КН-101

*/





function Node(Letter, Quantity, Pointer, Code) {
    this.Letter = Letter;
    this.Quantity = Quantity;
    this.Pointer = Pointer;
    this.Code = Code;

}




let fileName = process.argv[2];

let fs = require('fs');

fs.readFile(fileName, (err, data) => {
    if (err) {
        console.error(`File ${fileName} doesn\'t exist`);
    } else {
        raw_text = data.toString();
        console.log(raw_text);
        let alph = new Array();
        let n = 0; // counter of different characters
        for (let i = 0; i < raw_text.length; i++) {
                if (raw_text.charAt(i) in alph) {

                    alph[raw_text.charAt(i)] += 1;

                } else{

                    alph[raw_text.charAt(i)] = 1;
                    n+=1; 

                } 
             
        }
        if ( n==1) {
            console.error(`Invalid input: more than 1 different character is needed.`)
        }
        let encodeTable = new Array();

        for ( let i in alph){
            
            encodeTable.push(new Node(i, alph[i], null, null));
            
        }
        //console.log(table[0]);
        let i = 0;
        let fMin = Infinity, sMin = Infinity;
        let fMinInd = -1, sMinInd = -1;
        while (i < encodeTable.length) {
            if (encodeTable[i].Quantity < sMin && encodeTable[i].Quantity >= fMin && encodeTable[i].Pointer==null) {
                
                sMin = encodeTable[i].Quantity;
                sMinInd = i;

            } else if (encodeTable[i].Quantity < fMin && encodeTable[i].Pointer==null) {
                sMin = fMin;
                sMinInd = fMinInd;

                fMin = encodeTable[i].Quantity;
                fMinInd = i;
            } 
            if (i + 1 == encodeTable.length && (sMin != Infinity && fMin != Infinity)) {
                let left = encodeTable[fMinInd];
                let right = encodeTable[sMinInd];

                encodeTable.push(new Node(null, left.Quantity + right.Quantity, null, ''));

                encodeTable[fMinInd].Pointer = i + 1;
                encodeTable[sMinInd].Pointer = i + 1;

                encodeTable[fMinInd].Code = '0';
                encodeTable[sMinInd].Code = '1';

                sMin = Infinity;
                fMin = Infinity;
                
                i = -1;
            }

            i++;
            
        }


        function getCode(Letter) {
            let ind = 0;
            let code = '';
            while (ind<encodeTable.length && encodeTable[ind].Letter!=Letter){
                ind++;
            }
            while (ind != encodeTable.length-1){
                code = encodeTable[ind].Code + code;
                ind = encodeTable[ind].Pointer;
                
            }
            return code;
        }

        let encodedText = '';
        for (let i = 0; i < raw_text.length ; i++) {
            encodedText += getCode(raw_text.charAt(i));
        }
        console.log(encodedText);

        for (let char in alph) {
            console.log(`${char}: ${getCode(char)}`);
        }

    }


})