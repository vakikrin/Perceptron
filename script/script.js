'use strick';
class MultilayerPerceptron {
    constructor() {
        this.enters = []; //сигнал входа
        this.hidden = []; //сигнал скрытых слоев
        this.outer = []; //сигнал выхода
        this.weightsFromEntersToHidden = []; //веса
        this.weightsFromHiddenToOuter = []; //веса

    }
    init(quantityOfEnters, quantityOfHidden, quantityOfOut) {
        //Инициализируем все веса;
        for (var i = 0; i < quantityOfEnters; i++) {
            let mas = [];
            this.weightsFromEntersToHidden.push(mas);
            for (var j = 0; j < quantityOfHidden; j++) {
                this.weightsFromEntersToHidden[i].push(Math.random());
            }
        }
        for (var i = 0; i < quantityOfHidden; i++) {
            let mas = [];
            this.weightsFromHiddenToOuter.push(mas);
            for (var j = 0; j < quantityOfOut; j++) {
                this.weightsFromHiddenToOuter[i].push(Math.random());
            }
        }

        for (var j = 0; j < quantityOfEnters; j++) {
            this.enters.push(0);
        }
        for (var j = 0; j < quantityOfHidden; j++) {
            this.hidden.push(Math.random());
        }

        for (var j = 0; j < quantityOfOut; j++) {
            this.outer.push(0);
        }

    }
    print() {
        for (var i = 0; i < this.enters.length; i++) {
            for (var j = 0; j < this.hidden.length; j++) {
                console.log("fEtoH", this.weightsFromEntersToHidden[i][j]);
            }
        }

        for (var i = 0; i < this.hidden.length; i++) {
            for (var j = 0; j < this.outer.length; j++) {
                console.log("fHtoO", this.weightsFromHiddenToOuter[i][j]);
            }
        }
    }
    check(enters) {
        for (var i = 0; i < this.hidden.lenght; i++) {
            for (var j = 0; j < this.enters.length; j++) {
                this.hidden[i] += enters[j] * this.weightsFromEntersToHidden[j][i];
            }
            this.hidden[i] = this.activation(this.hidden[i]);
        }
        //  console.log(this.outer);
        for (var i = 0; i < this.outer.length; i++) {
            for (var j = 0; j < this.hidden.length; j++) {
                //	console.log("?",this.hidden)
                //	console.log("?",this.weightsFromHiddenToOuter)
                this.outer[i] += this.hidden[j] * this.weightsFromHiddenToOuter[j][i];
            }
            //	console.log("?",this.outer);
            this.outer[i] = this.activation(this.outer[i]);
            //console.log(this.outer);
        }
        //console.log(this.outer);
        return this.outer;
    }
    train(enters, targets) {
            var guess = this.check(enters);
            var error = [];
            for (var i = 0; i < this.outer.length; i++) {
                error.push(guess[i] * (1 - guess[i]) * (targets[i] - guess[i]));
            }
          
            
            for (var i = 0; i < this.hidden.length; i++) {
                for (var j = 0; j < this.outer.length; j++) {
                    this.weightsFromHiddenToOuter[i][j] += error[j] * this.hidden[i];
                }
            }
           
            var errorH = [];
            var sum = 0;
            for (var i = 0; i < this.hidden.length; i++) {
                for (var j = 0; j < this.outer.length; j++) {
                    sum += error[j] * this.weightsFromHiddenToOuter[i][j];
                }
                errorH.push(this.hidden[i] * (1 - this.hidden[i]) * sum);
                sum = 0;
            }
            
            for (var i = 0; i < this.enters.length; i++) {
                for (var j = 0; j < this.hidden.length; j++) {
                    this.weightsFromEntersToHidden[i][j] += errorH[j] * enters[i];
                }
            }
       
    }
  
    activation(arg) {
        return arg>0.5? 1:0;
      //  return 1 / (1 + Math.exp(arg / 2));
    }

}


var MLP = new MultilayerPerceptron();
MLP.init(2, 2, 1);
MLP.print();
for(var i=0; i<100; i++){
MLP.train([0, 0], [0]);
MLP.train([0, 1], [1]);
MLP.train([1, 0], [1]);
MLP.train([1, 1], [0]);
}
console.log('_________')
MLP.print();
console.log(MLP.check([0,0]));
console.log(MLP.check([1,0]));
