document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
  
    function getLabelText(name) {
      const input = document.querySelector(`input[name="${name}"]:checked`);
      if (!input) return '';
      const label = document.querySelector(`label[for="${input.id}"]`);
      return label ? label.textContent : '';
    }
  
    function checkSelections() {
      const exploreChecked = document.querySelector('input[name="explore"]:checked');
      const connectChecked = document.querySelector('input[name="connect"]:checked');
      const learnChecked = document.querySelector('input[name="learn"]:checked');
  
      // Only show button if all three are selected
      if (exploreChecked && connectChecked && learnChecked) {
        generateBtn.style.display = 'inline-block';
      } else {
        generateBtn.style.display = 'none';
      }
    }
  
    // Attach change listeners to all radios
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('change', checkSelections);
    });
  
    // Generate plan
    generateBtn.addEventListener('click', () => {
      const explore = getLabelText('explore');
      const connect = getLabelText('connect');
      const learn = getLabelText('learn');
  
      document.getElementById('plan-container').innerHTML = `
        <div id="plan-card" class="text-start">
          <h4>My Plan for the month:</h4>
          <ul>
            <li>${explore}</li>
            <li>${connect}</li>
            <li>${learn}</li>
          </ul>
        </div>
      `;
  
      document.getElementById('plan-card').scrollIntoView({ behavior: 'smooth' });
    });
  
    // Run once in case some radios are pre-checked
    checkSelections();
  });
  