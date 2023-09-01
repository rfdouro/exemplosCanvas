const rRelogio = {
  template: `<canvas></canvas>`,
  props: {
    width: Number,
    height: Number,
    raio: Number,
    bkgimg: String,
  },
  data() {
    return {
      tela: null,
      context: null,
      w: this.width,
      h: this.height,
      centro: [0, 0],
      imgFundo: new Image(),
      pSec: this.raio * 1,
      pMin: this.raio * 0.8,
      pHor: this.raio * 0.7,
    };
  },
  mounted() {
    this.$el.width = this.w;
    this.$el.height = this.h;
    this.centro = [this.w / 2, this.h / 2];
    this.context = this.$el.getContext("2d");
    this.imgFundo.src = this.bkgimg + ".png";
    let desenha = this.desenha;
    this.imgFundo.onload = function () {
      window.requestAnimationFrame(desenha);
    };
  },
  methods: {
    desenha() {
      this.context.clearRect(0, 0, this.w, this.h);
      this.desenhaFundo();
      let d = new Date();
      this.desenhaContorno();
      this.desenhaSegundos((d.getSeconds() * 6 * Math.PI) / 180);
      let minutos = d.getMinutes() + d.getSeconds() / 60;
      this.desenhaMinutos((minutos * 6 * Math.PI) / 180);
      let horas = (d.getHours() % 12) * 30 + minutos / 2;
      this.desenhaHora((horas * Math.PI) / 180);
      requestAnimationFrame(this.desenha);
    },
    desenhaFundo() {
      this.context.save();
      this.context.fillStyle = "#E4C9F3";
      this.context.fillRect(0, 0, this.w, this.h);
      //this.context.drawImage(this.imgFundo, 0, 0, this.w, this.h);

      this.context.translate(this.centro[0], this.centro[1]);

      this.context.font = "30px Comic Sans MS";
      this.context.fillStyle = "#7B09BC";
      this.context.textAlign = "center";
      for (let i = 1; i <= 60; i++) {
        this.context.save();
        this.context.rotate((i * 6 * Math.PI) / 180);
        if (i % 5 == 0) {
          this.context.fillText(`${i / 5}`, 0, -1 * this.raio * 0.8);
        } else {
          this.context.fillText(`·`, 0, -1 * this.raio * 0.8);
        }
        this.context.restore();
      }

      this.context.restore();
    },
    desenhaContorno() {
      this.context.save();
      this.context.beginPath();
      this.context.arc(
        this.w / 2,
        this.h / 2,
        this.raio * 0.96,
        0,
        Math.PI * 2
      );
      this.context.strokeStyle = "green";
      this.context.lineWidth = 3;
      this.context.stroke();
      this.context.restore();
    },
    desenhaSegundos(seg) {
      this.context.save();
      this.context.beginPath();
      this.context.translate(this.centro[0], this.centro[1]);
      this.context.rotate(seg);
      this.context.moveTo(0, 0);
      this.context.lineWidth = 3;
      this.context.strokeStyle = "white";
      this.context.lineTo(0, -1 * this.pSec);
      this.context.stroke();
      this.context.restore();
    },
    desenhaMinutos(min) {
      this.context.save();
      this.context.beginPath();
      this.context.translate(this.centro[0], this.centro[1]);
      this.context.rotate(min);
      this.context.moveTo(0, 0);
      this.context.lineWidth = 6;
      this.context.strokeStyle = "red";
      this.context.lineTo(0, -1 * this.pMin);
      this.context.stroke();
      this.context.restore();
    },
    desenhaHora(hor) {
      this.context.save();
      this.context.beginPath();
      this.context.translate(this.centro[0], this.centro[1]);
      this.context.rotate(hor);
      this.context.moveTo(0, 0);
      this.context.lineWidth = 9;
      this.context.strokeStyle = "blue";
      this.context.lineTo(0, -1 * this.pHor);
      this.context.stroke();
      this.context.restore();
    },
  },
};
