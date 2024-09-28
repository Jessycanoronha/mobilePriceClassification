import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import image from "./img/image.png"
import image1 from "./img/image1.png"
import image2 from "./img/image2.png"
import image3 from "./img/image3.png"

const CreateProduct: React.FC = () => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const selectsRef = useRef<HTMLSelectElement[]>([]);
  const bulletsRef = useRef<HTMLSpanElement[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [classification, setClassification] = useState()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const productData = {
      battery_power: (inputsRef.current[0].value),
      clock_speed: (inputsRef.current[1].value),
      fc: (inputsRef.current[2].value),
      int_memory: (selectsRef.current[0].value),
      n_cores: (selectsRef.current[1].value),
      pc: (inputsRef.current[3].value),
      ram: (inputsRef.current[4].value),
      talk_time: (inputsRef.current[5].value),
    };

    fetch("http://localhost:5000/find-best-mobile-price", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          alert("Failed to save product data");
          throw new Error('Failed to fetch data');
        }
      })
      .then((data) => {
        alert("Product Data saved successfully");
        setClassification(data.classification);
        console.log(classification);
      })
      .catch((err) => console.log(err.message));
  }

  useEffect(() => {
    const inputs = inputsRef.current;
    const selects = document.querySelectorAll('select'); // Seleciona todos os selects
    const bullets = bulletsRef.current;
    const images = imagesRef.current;

    inputs.forEach((inp) => {
      inp.addEventListener('focus', () => {
        inp.classList.add('active');
      });
      inp.addEventListener('blur', () => {
        if (inp.value !== '') return;
        inp.classList.remove('active');
      });
    });

    selects.forEach((sel) => {
      sel.addEventListener('focus', () => {
        sel.classList.add('active');
      });
      sel.addEventListener('blur', () => {
        if (sel.value !== '') return;
        sel.classList.remove('active');
      });
    });


    const moveSlider = function (this: HTMLSpanElement) {
      const index = this.dataset.value;

      images.forEach((img) => img.classList.remove('show'));
      const currentImage = document.querySelector(`.img-${index}`);
      currentImage?.classList.add('show');

      const textSlider = document.querySelector('.text-group') as HTMLElement;
      textSlider.style.transform = `translateY(${-(parseInt(index!) - 1) * 2.2}rem)`;

      bullets.forEach((bull) => bull.classList.remove('active'));
      this.classList.add('active');
    };

    bullets.forEach((bullet) => {
      bullet.addEventListener('click', moveSlider);
    });

    return () => {
      inputs.forEach((inp) => {
        inp.removeEventListener('focus', () => { });
        inp.removeEventListener('blur', () => { });
      });
      bullets.forEach((bullet) => {
        bullet.removeEventListener('click', moveSlider);
      });
    };
  }, []);

  return (
    <main>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            <form onSubmit={handleSubmit} autoComplete="off" className="price-form">
              <div className="logo">
                <h4>Mobile Price Classifier</h4>
              </div>

              <div className="actual-form">
                {['Battery Power', 'Clock Speed', 'Frontal Camera', 'Primary Camera', 'RAM', 'Talk Time'].map((label, index) => (
                  <div className="input-wrap" key={index}>
                    <input
                      type="number"
                      className="input-field"
                      min="0"
                      required
                      ref={(el) => (inputsRef.current[index] = el as HTMLInputElement)}
                      id={label.replace(/\s+/g, '_').toLowerCase()}
                    />
                    <label>{label}</label>
                  </div>
                ))}

                {/* Select for Internal Memory */}
                <div className="input-wrap">
                  <select
                    className="input-field"
                    required
                    ref={(el) => (selectsRef.current[0] = el as HTMLSelectElement)}
                    id="internal_memory"
                  >
                    <option value="" disabled>Select Internal Memory</option>
                    <option value={2}>2 GB</option>
                    <option value={4}>4 GB</option>
                    <option value={8}>8 GB</option>
                    <option value={16}>16 GB</option>
                    <option value={32}>32 GB</option>
                    <option value={64}>64 GB</option>
                  </select>
                  <label>Internal Memory</label>
                </div>

                {/* Select for Number of Cores */}
                <div className="input-wrap">
                  <select
                    className="input-field"
                    required
                    ref={(el) => (selectsRef.current[1] = el as HTMLSelectElement)}
                    id="number_of_cores"
                  >
                    <option value="" disabled>Select Number of Cores</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={4}>4</option>
                    <option value={6}>6</option>
                    <option value={8}>8</option>
                  </select>
                  <label className="input_field">Number of Cores</label>
                </div>

                <input type="submit" value="Classify" className="sign-btn" />
              </div>
            </form>
          </div>

          {classification !== null && classification !== undefined ? (
            <div className="carousel mobile-classification">
              <img src={image} className="image img-1 show" alt="" ref={(el) => (imagesRef.current[0] = el as HTMLImageElement)} />
              {classification === 0 && <span><strong>Este celular é uma verdadeira pechincha!</strong><br /> Perfeito para quem busca economia sem abrir mão da funcionalidade.</span>}
              {classification === 1 && <span><strong>Uma excelente escolha para quem busca equilíbrio entre preço acessível e desempenho sólido.</strong><br /> Ideal para o uso cotidiano.</span>}
              {classification === 2 && <span><strong>Uma boa escolha</strong><br />Com recursos avançados e desempenho robusto, este celular é indicado para quem deseja mais poder e está disposto a pagar por isso.</span>}
              {classification === 3 && <span><strong>Um verdadeiro símbolo de luxo e tecnologia de ponta. </strong><br />Para quem não aceita nada menos que o melhor, independentemente do preço.</span>}

            </div>
          ) : (
            <div className="carousel">
              <div className="images-wrapper">
                <img src={image1} className="image img-1 show" alt="" ref={(el) => (imagesRef.current[0] = el as HTMLImageElement)} />
                <img src={image2} className="image img-2" alt="" ref={(el) => (imagesRef.current[1] = el as HTMLImageElement)} />
                <img src={image3} className="image img-3" alt="" ref={(el) => (imagesRef.current[2] = el as HTMLImageElement)} />
              </div>

              <div className="text-slider">
                <div className="text-wrap">
                  <div className="text-group">
                    <h2>Descubra opções acessíveis.</h2>
                    <h2>Preço e desempenho.</h2>
                    <h4>Explore dispositivos de alto padrão.</h4>
                  </div>
                </div>

                <div className="bullets">
                  <span className="active" data-value="1" ref={(el) => (bulletsRef.current[0] = el as HTMLSpanElement)}></span>
                  <span data-value="2" ref={(el) => (bulletsRef.current[1] = el as HTMLSpanElement)}></span>
                  <span data-value="3" ref={(el) => (bulletsRef.current[2] = el as HTMLSpanElement)}></span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
};

export default CreateProduct;
