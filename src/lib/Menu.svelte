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
        <b>Дайс атаки</b> содержит различные типы  атаки и одну грань <b>«промаха»</b> <img src='/dice/attack-empty.jpg' width="48" height="48" loading="lazy">.
      </p>
      <p>
        Атакующий кидает <b>«дайс атаки»</b> и читает выпавшую верхом грань: если выпал <b>«промах»</b> атака считается безрезультатной, если фигура занимает пустую ячейку, или ячейку со щитом, ход переходит ко второму игроку
      </p>
      <p>
        <b>Дайс защиты</b> имеет три грани <b>«успешной защиты»</b> <img src='/dice/protection-shield.jpg' width="48" height="48" loading="lazy">, выпадение которых заставляет атаковавшую фигурку сделать шаг назад по линии атаки (в сторону и назад, если та
        у края поля), и три грани <b>«пропущенного удара»</b> <img src='/dice/protection-sword.jpg' width="48" height="48" loading="lazy">, выпадение которых лишает щита (попытки) оборонявшегося игрока.
      </p>
      <p>
        <b>«Дайс зоны поражения»</b> кидается вместе с <b>«дайсом атаки»</b> атакующим, и указывает куда приходится атака. При его использовании, в случае успешной атаки, следует учитывать выпадающие результаты так:
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
          <img src='/dice/damage-belly.jpg' width="48" height="48" loading="lazy"> - грудь, руки, ноги или живот, защищавшийся лишается одного щита, или последней попытки если все щиты уже потеряны.
        </li>
      </ul>

      <h2 class="title">Правила игры "Три щита"</h2>
      <p>
        Игра предназначена для игры солдатиками для двух игроков или команд в дуэльном формате равными командами.
      </p>
      <ol>
        <li>Первенство хода и выбора солдатика определяется жеребьёвкой.</li>
        <li>Игроки ходят по очереди, начиная движение с равноудалённых краёв поля.</li>
        <li>Ход каждого игрока (команды) состоит из манёвра и атаки. Игроку не запрещается отказаться от любой фазы его хода, но игрок не может пропустить ход целиком.</li>
        <li>Каждый игрок (команда) атакует только в свой ход, и только если ему позволяет его вооружение (смотри п.5 или таблицу арм-лист).</li>
        <li>Дальность атаки: двумя дайсам атаки («дайс атаки» и «дайс зоны поражения»)
          <b>фехтовальщик</b> может атаковать только соседние ячейки;
          <b>копейщик</b> - только 2-ю от него ячейку, а смежную только одним дайсом - «дайсом атаки»;
          <b>стрелок</b> ячейки на удалении от него от 2-ой до 4-ой, а смежную только одним дайсом - «дайсом атаки».</li>
        <li>
          <b>Клинч</b>: Если на соседней ячейке с копейщиком или стрелком стоит <b>вражеская фигура</b>, то они лишаются возможности атаковать фигуры противника на дистанции, и могут атаковать только смежную (прилегающую) ячейку, и только одним дайсом - «дайсом атаки»*.
        </li>
        <li>Копейщик
          <b>выходит из клинча</b>
          , и получает возможность вновь пользоваться своим вооружением на дистанции, увеличив дистанцию от противника до 2-х ячеек, а стрелок от 2-х до 4-х ячеек.
        </li>
        <li>Копейщик и стрелок не могут бить по фигуре противника полностью перекрытой другой фигурой, союзной или вражеской, стоящей на линии атаки. Если вражеская фигура перекрыта только до половины - атака на неё возможна, если это позволяет вооружение вашей фигуры (см. пункт 5.).</li>
        <li>Игровое поле содержит <b>бонусные ячейки</b>, дающие преимущество занимающему их воину:
          <ul>
            <li>
              <img src='/shield.png' width="48" height="48" loading="lazy"> - ячейка <b>«щит»</b> позволяет перебросить дайс защиты <img src='/dice/protection-shield.jpg' width="48" height="48" loading="lazy"> второй раз, в случае поражения <img src='/dice/protection-sword.jpg' width="48" height="48" loading="lazy"> при первом броске;
            </li>
            <li>
              <img src='/attack.png' width="48" height="48" loading="lazy"> - ячейка <b>«атака»</b> позволяет занимающему её воину атаковать противника <b>дважды в свой ход</b>, но только если первая атака нанесла урон (фигура врага потеряла щит), или выпал промах <img src='/dice/attack-empty.jpg' width="48" height="48" loading="lazy">.
            </li>
          </ul>
        </li>
        <li>Если <b>первая атака</b> была успешно отбита защищавшейся фигурой, то атаковавшая фигура делает шаг наза по линии атаки (в сторону и назад, если находится у края поля).</li>
        <li>Игра ведётся до потери всех фигур одним из соперников. Фигура считается побеждённой при потере всех щитов и ещё одного поражения.</li>
        <li>Проигравшим считается игрок (команда), чья последняя фигура проиграла схватку, оставшись без щитов.</li>
        <li>Любой игрок (команда) имеет право прекратить бой, признав себя побеждённым.</li>
      </ol>
      <p>* При игре с дополнением-расходными карточками, ресурс вооружения растрачивается только при броске обоих дайсов атаки - «дайса атаки» и «дайса зоны поражения». При атаке в клинче, т.е. при броске только основного дайса атаки, ресурс карты вооружения не уменьшается.</p>
      <p class="author">
        <i>N.B! Авторы игры напоминают: какие бы разногласия не возникали в ходе игры - взаимопонимание и дружба важнее всего, даже правил (-:</i>
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
    font-weight: bold;
  }

  img {
    vertical-align: middle;
  }

  li {
    margin-bottom: 0.5em;
  }
</style>

