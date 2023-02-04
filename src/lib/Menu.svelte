<script lang="ts">
  // https://www.svgrepo.com/collection/ui-icons-with-gap/2
  import { onDestroy } from 'svelte'

  let modalOpen = false

  function handleModalOpen(evt: Event) {
    (evt.target as HTMLButtonElement).blur()
    modalOpen = true
    window.addEventListener('keydown', handleEsc);
  }

  function handleModalClose(evt: Event) {
    (evt.target as HTMLButtonElement).blur()
    modalOpen = false
    window.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(evt: Event) {
    if (['Esc', 'Escape'].includes(evt.key)) {
      modalOpen = false
    }
  }

  onDestroy(() => {
    window.removeEventListener('keydown', handleEsc)
  })
</script>

<div class="menu">
  <button on:click={handleModalOpen} class="button" type="button">
    <svg viewBox="0 0 24 24" fill="none" class="icon">
      <path d="M4 7H12M20 7H16M4 12H20M4 17H8M20 17H12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  </button>
</div>
{#if modalOpen}
  <div class="modal">
    <button on:click={handleModalClose} class="button modal-close" type="button">
      <svg viewBox="0 0 24 24" fill="none" class="icon">
        <path d="M19 5L5 19M5.00001 5L9.5 9.5M19 19L12 12" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="modal-content">
      <h2 class="title">Значения игровых дайсов</h2>
      <p>
        В игре применяются уникальные дайсы, всего их три: 
      </p>
      <ul>
        <li>дайс атаки <img src='/dice/attack-sword.jpg' width="48" height="48" loading="lazy"></li>
        <li>дайс зоны поражения <img src='/dice/damage-chest.jpg' width="48" height="48" loading="lazy"></li>
        <li>дайс защиты <img src='/dice/protection-shield.jpg' width="48" height="48" loading="lazy"></li>
      </ul>
      <p>
        <b>Дайс атаки</b> содержит различные типы  атаки и одну грань <b>«промаха»</b> <img src='/dice/attack-empty.jpg' width="48" height="48" loading="lazy">. Атакующий кидает дайс и читает выпавшую верхом грань: если выпал <b>«промах»</b>  атака считается безрезультатной, ход переходит ко второму игроку.
      </p>
      <p>
        <b>Дайс защиты</b> имеет три грани <b>«успешной защиты»</b> <img src='/dice/protection-shield.jpg' width="48" height="48" loading="lazy"> и три грани <b>«пропущенного удара»</b> <img src='/dice/protection-sword.jpg' width="48" height="48" loading="lazy">, выпадение которых лишает щита (попытки) оборонявшегося игрока.
      </p>
      <p>
        <b>Дайс зоны поражения</b> используется с согласия обоих игроков, кидается вместе с дайсом атаки нападающим, и указывает куда приходится атака. При его использовании, в случае успешной атаки, следует  учитывать выпадающие результаты так:
      </p>
      <ul>
        <li>
          <img src='/dice/damage-skull.jpg' width="48" height="48" loading="lazy"> - голова  (удар по шлему), противник лишается двух щитов (или оставшегося щита и жизни);
        </li>
        <li>
          <img src='/dice/damage-groin.jpg' width="48" height="48" loading="lazy"> - удар в пах (шок), защищавшийся  теряет один щит и пропускает свой ход, ход переходит  вновь к нападавшему;
        </li>
        <li>
          <img src='/dice/damage-chest.jpg' width="48" height="48" loading="lazy">
          <img src='/dice/damage-arm.jpg' width="48" height="48" loading="lazy">
          <img src='/dice/damage-leg.jpg' width="48" height="48" loading="lazy">
          <img src='/dice/damage-belly.jpg' width="48" height="48" loading="lazy"> - грудь, руки, ноги или живот, защищавшийся лишается одного щита или последней попытки.
        </li>
      </ul> 
           
      <p>
        Игра предназначена для игры солдатиками для двух игроков в формате 1х1, или четырёх игроков в командном формате 2х2.
      </p>

      <h2 class="title">Правила игры "Три щита"</h2>
      <ol>
        <li>Первенство хода и выбора солдатика определяется жеребьёвкой.</li>
        <li>Игроки ходят по очереди, начиная движение с краёв поля.</li>
        <li>Ход каждого игрока (команды) состоит из манёвра и атаки. Игроку не запрещается отказаться от своего хода  или любой его фазы, но не более одно раза кряду.</li>
        <li>Каждый игрок (команда) атакует только в свой ход, и только если ему позволяет его вооружение (смотри таблицу).</li>
        <li>Игра ведётся до потери всех щитов одним из соперников и ещё одного поражения. Для командного спарринга - до потери командой последней фигуры.</li>
        <li>Игровое поле содержит <b>бонусные ячейки</b>, дающие преимущество занимающему их воину:
          <ul>
            <li>
              <img src='/shield.png' width="48" height="48" loading="lazy"> - ячейка <b>«щит»</b> позволяет перебросить дайс защиты ещё раз, в случае поражения при первом броске;
            </li>
            <li>
              <img src='/attack.png' width="48" height="48" loading="lazy"> - ячейка <b>«атака»</b> позволяет занимающему её воину атаковать противника  дважды в свой ход;
            </li>
          </ul>
        </li>
        <li>
          Проигравшим считается игрок (команда), чья фигура проиграла схватку,  оставшись без щитов. Любой игрок (команда) имеет право прекратить бой, признав себя побеждённым.
        </li>       
      </ol>
      <p class="author">
        <i>Авторы игры напоминают: какие бы у вас не возникли разногласия в ходе сражения, помните что дружба и взаимопонимание важнее всего, даже правил (-:</i>
      </p>
    </div>
  </div>
{/if}

<style>
  .menu {
    position: absolute;
    top: 0;
    right: 0;
  }

  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 48px 16px;
    color: #fff;
    background-color: var(--theme-color);
    overflow: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .modal::-webkit-scrollbar {
    display: none;
  }
  
  @media (min-width: 600px) {
    .modal {
      padding: 64px 48px;
    }
  }

  .modal-content {
    max-width: 900px;
    margin: 0 auto;
  }

  .modal-close {
    position: fixed;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .button {
    margin: 0;
    padding: 2em;
    border: none;
    background-color: transparent;
    cursor: pointer;
    opacity: 0.6;
    transition: 0.2s opacity ease-in-out;
  }

  @media (hover: hover) {
    .button:hover,
    .button:focus {
      opacity: 1;
    }
  }

  .icon {
    display: block;
    width: 2em;
    height: 2em;
  }

  .title {
    text-align: center;
  }

  .author {
    margin-top: 4em;
    text-align: center;
  }

  img {
    vertical-align: middle;
  }

  li {
    margin-bottom: 0.5em;
  }
</style>

