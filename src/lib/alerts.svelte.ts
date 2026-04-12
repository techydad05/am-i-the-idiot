class AlertManager {
  message = $state('');
  type = $state('info'); // info, error, success, shame
  visible = $state(false);

  trigger(message: string, type: 'info' | 'error' | 'success' | 'shame' = 'info') {
    this.message = message;
    this.type = type;
    this.visible = true;
    
    setTimeout(() => {
      this.visible = false;
    }, 5000);
  }
}

export const alerts = new AlertManager();
